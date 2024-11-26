export const ACTIVE = "Active";
export const DELETED = "Deleted";

/**
 * File
 */
export class File {
  /**
   * Created a file
   * @param {string} filename - Filename of the file 
   * @param {string} fileType - type of file (e.g., "image/png", "application/pdf")
   * @param {number} fileId - unique id
   * @param {string} fileStatus - use the exported constants [ACTIVE, DELETED]
   */
  constructor(fileName, fileType, fileId, fileStatus) {
    this.fileName = fileName;
    this.fileType = fileType;
    this.uploadDate = new Date();
    this.fileId = fileId;
    this.fileStatus = fileStatus;
  }
}
