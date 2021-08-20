export const FILE_FORMATS = {
  audio: [
    ".ac3",
    ".a52",
    ".eac3",
    ".mlp",
    ".dts",
    ".dts-hd",
    ".dtshd",
    ".true-hd",
    ".thd",
    ".truehd",
    ".thd+ac3",
    ".tta",
    ".pcm",
    ".wav",
    ".aiff",
    ".aif",
    ".aifc",
    ".amr",
    ".awb",
    ".au",
    ".snd",
    ".lpcm",
    ".ape",
    ".wv",
    ".shn",
    ".adts",
    ".adt",
    ".mpa",
    ".m1a",
    ".m2a",
    ".mp1",
    ".mp2",
    ".mp3",
    ".m4a",
    ".aac",
    ".flac",
    ".oga",
    ".ogg",
    ".opus",
    ".spx",
    ".mka",
    ".weba",
    ".wma",
    ".f4a",
    ".ra",
    ".ram",
    ".3ga",
    ".3ga2",
    ".ay",
    ".gbs",
    ".gym",
    ".hes",
    ".kss",
    ".nsf",
    ".nsfe",
    ".sap",
    ".spc",
    ".vgm",
    ".vgz",
    ".cue",
  ],
  video: [
    ".yuv",
    ".y4m",
    ".m2ts",
    ".m2t",
    ".mts",
    ".mtv",
    ".ts",
    ".tsv",
    ".tsa",
    ".tts",
    ".trp",
    ".mpeg",
    ".mpg",
    ".mpe",
    ".mpeg2",
    ".m1v",
    ".m2v",
    ".mp2v",
    ".mpv",
    ".mpv2",
    ".mod",
    ".tod",
    ".vob",
    ".vro",
    ".evob",
    ".evo",
    ".mpeg4",
    ".m4v",
    ".mp4",
    ".mp4v",
    ".mpg4",
    ".h264",
    ".avc",
    ".x264",
    ".264",
    ".hevc",
    ".h265",
    ".x265",
    ".265",
    ".ogv",
    ".ogm",
    ".ogx",
    ".mkv",
    ".mk3d",
    ".webm",
    ".avi",
    ".vfw",
    ".divx",
    ".3iv",
    ".xvid",
    ".nut",
    ".flic",
    ".fli",
    ".flc",
    ".nsv",
    ".gxf",
    ".mxf",
    ".wm",
    ".wmv",
    ".asf",
    ".dvr-ms",
    ".dvr",
    ".wt",
    ".dv",
    ".hdv",
    ".flv",
    ".f4v",
    ".qt",
    ".mov",
    ".hdmov",
    ".rm",
    ".rmvb",
    ".3gpp",
    ".3gp",
    ".3gp2",
    ".3g2",
  ],
  playlist: [".m3u", ".m3u8", ".pls"],
  subtitle: [
    ".aqt",
    ".cvd",
    ".dks",
    ".jss",
    ".sub",
    ".ttxt",
    ".mpl",
    ".sub",
    ".pjs",
    ".psb",
    ".rt",
    ".smi",
    ".ssf",
    ".srt",
    ".ssa",
    ".ass",
    ".sub",
    ".svcd",
    ".usf",
    ".sub",
    ".idx",
    ".txt",
  ],
};

export function detectFileType(extension) {
  extension = "." + extension.toLowerCase();

  if (FILE_FORMATS.video.includes(extension)) {
    return "video";
  } else if (FILE_FORMATS.audio.includes(extension)) {
    return "audio";
  } else if (FILE_FORMATS.subtitle.includes(extension)) {
    return "subtitle";
  } else {
    return "file";
  }
}
