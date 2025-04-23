export interface PictureDTO {
  id: string;
  entityId: string;
  url: string;
  path: string;
  originalName: string;
  sequence?: number;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
