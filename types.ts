
export interface UploadFormData {
  employeeId: string;
  employeeName: string;
  interviewerName: string;
  audioFile: File | null;
}

export interface GroundingChunkWeb {
  uri: string;
  title: string;
}

export interface GroundingChunk {
  web?: GroundingChunkWeb;
  // May include other types of chunks like "retrievedContext"
}
// Note: Other Gemini related types are not needed for this specific application.
