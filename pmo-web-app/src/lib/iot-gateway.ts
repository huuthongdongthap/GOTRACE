/**
 * GOTRACE Phase 2: IoT Gateway & Cold-chain Telemetry Service
 * Ingests, validates, and evaluates real-time telemetry from refrigerated containers (Fruit chains).
 *
 * References:
 * - plans/2026-09-27-phase-02-expansion-plan/phase-02-branching-fruit-gacc-compliance.md
 * - Lệnh 280 GACC (Nhiệt độ bảo quản container 2°C - 5°C, độ ẩm 80% - 90%)
 */

export interface TelemetryReading {
  container_id: string;
  timestamp: string;
  temperature: number; // Celsius
  humidity: number; // Percentage (0-100)
  location: {
    latitude: number;
    longitude: number;
    address_marker?: string;
  };
  door_status: "CLOSED" | "OPEN";
  battery_pct: number;
  reefer_power_status: "ACTIVE" | "IDLE" | "FAULT";
}

export interface TelemetryAlert {
  id: string;
  container_id: string;
  severity: "INFO" | "WARNING" | "CRITICAL";
  code: "TEMP_EXCURSION_HIGH" | "TEMP_EXCURSION_LOW" | "HUMIDITY_LOW" | "DOOR_AJAR" | "ROUTE_DEVIATION" | "REEFER_FAULT";
  message: string;
  timestamp: string;
  reading: TelemetryReading;
}

export interface ContainerRouteProfile {
  id: string;
  cargo: string;
  weight_tons: number;
  origin_place_gci: string;
  polygon_id: string;
  destination: string;
  target_temp_min: number; // 2.0
  target_temp_max: number; // 5.0
  target_humidity_min: number; // 80.0
  target_humidity_max: number; // 90.0
  status: "IN_TRANSIT" | "ARRIVED" | "HELD_CUSTOMS" | "ALERT";
}

export class ColdChainIoTGateway {
  private alerts: TelemetryAlert[] = [];
  private latestReadings: Map<string, TelemetryReading> = new Map();

  // Ingest reading from container sensors (BLE / 4G Gateway)
  public ingestReading(
    reading: TelemetryReading,
    profile?: ContainerRouteProfile
  ): TelemetryAlert | null {
    this.latestReadings.set(reading.container_id, reading);

    const minTemp = profile ? profile.target_temp_min : 2.0;
    const maxTemp = profile ? profile.target_temp_max : 5.0;

    let alert: TelemetryAlert | null = null;

    if (reading.temperature > maxTemp) {
      alert = {
        id: `ALT-TEMP-HIGH-${Date.now()}`,
        container_id: reading.container_id,
        severity: reading.temperature > maxTemp + 2.0 ? "CRITICAL" : "WARNING",
        code: "TEMP_EXCURSION_HIGH",
        message: `Nhiệt độ container vượt ngưỡng quy định GACC: ${reading.temperature.toFixed(1)}°C (Ngưỡng tối đa: ${maxTemp}°C)`,
        timestamp: reading.timestamp,
        reading,
      };
    } else if (reading.temperature < minTemp) {
      alert = {
        id: `ALT-TEMP-LOW-${Date.now()}`,
        container_id: reading.container_id,
        severity: "WARNING",
        code: "TEMP_EXCURSION_LOW",
        message: `Nhiệt độ container quá thấp có nguy cơ đóng băng vỏ trái cây: ${reading.temperature.toFixed(1)}°C`,
        timestamp: reading.timestamp,
        reading,
      };
    } else if (reading.reefer_power_status === "FAULT") {
      alert = {
        id: `ALT-REEFER-${Date.now()}`,
        container_id: reading.container_id,
        severity: "CRITICAL",
        code: "REEFER_FAULT",
        message: "Hệ thống máy làm lạnh (Reefer unit) báo lỗi mất nguồn!",
        timestamp: reading.timestamp,
        reading,
      };
    }

    if (alert) {
      this.alerts.unshift(alert);
      if (this.alerts.length > 50) this.alerts.pop();
    }

    return alert;
  }

  public getLatestReading(containerId: string): TelemetryReading | undefined {
    return this.latestReadings.get(containerId);
  }

  public getRecentAlerts(containerId?: string): TelemetryAlert[] {
    if (containerId) {
      return this.alerts.filter((a) => a.container_id === containerId);
    }
    return this.alerts;
  }
}

export const coldChainIoTGateway = new ColdChainIoTGateway();
