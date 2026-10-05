/**
 * GoTRACE Field Gateway API Client
 * Coordinates network requests and offline fallback via OfflineSyncQueue.
 */

import {
  CropPlanEventPayload,
  AwdLogPayload,
  InputAppliedPayload,
  HarvestLotPayload,
  OfflineQueueItem,
} from "../types/index.js";
import { offlineSyncQueue } from "./offlineQueue.js";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  queuedOffline?: boolean;
  message?: string;
  timestamp: string;
}

export class FieldGatewayApiClient {
  private networkOnline = true;

  constructor() {
    this.networkOnline =
      typeof navigator !== "undefined" && "onLine" in navigator
        ? navigator.onLine
        : true;

    // Connect queue flush handler to API dispatch
    offlineSyncQueue.setSyncHandler(async (item: OfflineQueueItem) => {
      return this.dispatchQueueItem(item);
    });
  }

  public setNetworkStatus(online: boolean): void {
    this.networkOnline = online;
  }

  public isOnline(): boolean {
    return this.networkOnline;
  }

  /**
   * Submit CROP_PLAN_CREATED
   */
  public async submitCropPlan(
    payload: CropPlanEventPayload
  ): Promise<ApiResponse<CropPlanEventPayload>> {
    if (!this.networkOnline) {
      offlineSyncQueue.enqueue("CROP_PLAN_CREATED", payload);
      return {
        success: true,
        queuedOffline: true,
        message: "Mất sóng ngoài ruộng. Đã lưu hàng đợi ngoại tuyến FIFO!",
        timestamp: new Date().toISOString(),
      };
    }

    // Live submission simulation
    await new Promise((resolve) => setTimeout(resolve, 80));
    return {
      success: true,
      data: payload,
      message: "Đã gửi sự kiện CROP_PLAN_CREATED thành công lên hệ thống GoTRACE!",
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Submit AWD_LOG
   */
  public async submitAwdLog(
    payload: AwdLogPayload
  ): Promise<ApiResponse<AwdLogPayload>> {
    if (!this.networkOnline) {
      offlineSyncQueue.enqueue("AWD_LOG", payload);
      return {
        success: true,
        queuedOffline: true,
        message: "Lưu nhật ký nước ngoại tuyến thành công!",
        timestamp: new Date().toISOString(),
      };
    }

    await new Promise((resolve) => setTimeout(resolve, 80));
    return {
      success: true,
      data: payload,
      message: "Đã cập nhật dữ liệu AWD & tích lũy điểm carbon 1Mha!",
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Submit INPUT_APPLIED
   */
  public async submitInputApplied(
    payload: InputAppliedPayload
  ): Promise<ApiResponse<InputAppliedPayload>> {
    if (!this.networkOnline) {
      offlineSyncQueue.enqueue("INPUT_APPLIED", payload);
      return {
        success: true,
        queuedOffline: true,
        message: "Đã lưu kết quả OCR phân thuốc ngoại tuyến!",
        timestamp: new Date().toISOString(),
      };
    }

    await new Promise((resolve) => setTimeout(resolve, 80));
    return {
      success: true,
      data: payload,
      message: "Đã ghi nhận vật tư vào sổ nhật ký mùa vụ!",
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Submit HARVEST_REQUEST
   */
  public async submitHarvestRequest(
    payload: HarvestLotPayload
  ): Promise<ApiResponse<HarvestLotPayload>> {
    if (!this.networkOnline) {
      offlineSyncQueue.enqueue("HARVEST_REQUEST", payload);
      return {
        success: true,
        queuedOffline: true,
        message: "Đã tạo mã Lô gặt ngoại tuyến. Sẽ đồng bộ khi có 4G!",
        timestamp: new Date().toISOString(),
      };
    }

    await new Promise((resolve) => setTimeout(resolve, 80));
    return {
      success: true,
      data: payload,
      message: `Đã phát lệnh thu hoạch thành công! Mã lô: ${payload.lotId}`,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Dispatch item when flushing from offline queue
   */
  private async dispatchQueueItem(item: OfflineQueueItem): Promise<boolean> {
    try {
      switch (item.type) {
        case "CROP_PLAN_CREATED":
          await this.submitCropPlan(item.payload as CropPlanEventPayload);
          return true;
        case "AWD_LOG":
          await this.submitAwdLog(item.payload as AwdLogPayload);
          return true;
        case "INPUT_APPLIED":
          await this.submitInputApplied(item.payload as InputAppliedPayload);
          return true;
        case "HARVEST_REQUEST":
          await this.submitHarvestRequest(item.payload as HarvestLotPayload);
          return true;
        default:
          return true;
      }
    } catch {
      return false;
    }
  }
}

export const apiClient = new FieldGatewayApiClient();
