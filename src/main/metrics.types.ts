export interface ImageAnalysisMetrics {
  success: boolean;
  face_detected: boolean;
  metrics: {
    face: {
      left_eye_ear: number;
      right_eye_ear: number;
      eye_openness: number;
      is_blink: boolean;
      sideways_tilt_deg: number;
      front_back_tilt_deg_est: number;
      mouth_open_ratio: number;
      is_yawn: boolean;
      eye_to_eye_distance_px: number;
    };
    pose: {
      pose_detected: boolean;
      shoulders_z: number;
      head_z: number;
      shoulder_line_tilt_deg: number;
      shoulder_width_px: number;
    };
  };
}
