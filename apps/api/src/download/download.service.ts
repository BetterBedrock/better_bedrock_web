import { Injectable } from "@nestjs/common";
import { Download } from "src/download/interfaces/download.interface";

@Injectable()
export class DownloadService {
  private readonly downloads: Download[] = [];

  download(download: Download) {
    this.downloads.push(download);
  }

  fetchAll() {
    return this.downloads;
  }
}
