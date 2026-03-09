const sharedButtonBase = {
  position: "relative",
  overflow: "hidden",
  borderRadius: "100px",
  fontSize: "clamp(10px, 2.5vw, 16px)",
  px: 3,
  py: 1.1,
  color: "#fff",
  textShadow: "0 2px 8px rgba(0, 0, 0, 0.18)",
  backdropFilter: "blur(15px) saturate(200%)",
  WebkitBackdropFilter: "blur(15px) saturate(200%)",
  boxShadow:
    "inset 0 2px 5px rgba(255,255,255,0.58), 0 10px 25px -8px rgba(0,0,0,0.42), 0 0 0 1px rgba(255,255,255,0.18) inset, 0 0 0 2px rgba(255,255,255,0.08)",
  transition:
    "transform 0.25s cubic-bezier(0.2, 0.9, 0.3, 1.1), background 0.4s ease, box-shadow 0.3s ease",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    height: "50%",
    borderRadius: "inherit",
    background:
      "linear-gradient(rgba(255,255,255,0.72), rgba(255,255,255,0.06))",
    opacity: 0.45,
    pointerEvents: "none",
  },
  "& > *": {
    position: "relative",
    zIndex: 1,
  },
  "&:hover": {
    transform: "scale(1.02) translateY(-3px)",
  },
  "&.Mui-disabled": {
    color: "rgba(255,255,255,0.78)",
    opacity: 0.7,
    boxShadow:
      "inset 0 2px 5px rgba(255,255,255,0.42), 0 8px 18px -10px rgba(0,0,0,0.28)",
  },
};

export const orangeLiquidButtonSx = {
  ...sharedButtonBase,
  background:
    "radial-gradient(140% 140% at 0% 20%, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0) 52%), linear-gradient(125deg, rgba(255,168,82,0.96) 0%, rgba(255,196,118,0.92) 42%, rgba(251,127,5,0.88) 100%), linear-gradient(145deg, rgba(255,255,255,0.16) 0%, rgba(255,220,190,0.08) 100%), rgba(251,127,5,0.88)",
  boxShadow:
    "inset 0 2px 5px rgba(255,255,255,0.58), inset 0 -4px 8px rgba(120,52,0,0.22), 0 10px 25px -8px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.18) inset, 0 0 0 2px rgba(255,255,255,0.08)",
  "&:hover": {
    ...sharedButtonBase["&:hover"],
    background:
      "radial-gradient(150% 150% at 10% 20%, rgba(255,255,255,0.68) 0%, rgba(255,255,255,0) 58%), linear-gradient(125deg, rgba(255,178,100,0.98) 0%, rgba(255,204,128,0.94) 50%, rgba(251,127,5,0.9) 100%), rgba(251,127,5,0.92)",
    boxShadow:
      "inset 0 3px 8px rgba(255,255,255,0.78), inset 0 -4px 8px rgba(120,52,0,0.16), 0 18px 30px -10px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.24) inset, 0 0 0 2px rgba(255,255,255,0.12)",
  },
};

export const purpleLiquidButtonSx = {
  ...sharedButtonBase,
  background:
    "radial-gradient(140% 140% at 0% 20%, rgba(255,255,255,0.56) 0%, rgba(255,255,255,0) 52%), linear-gradient(125deg, rgba(136,56,214,0.95) 0%, rgba(170,110,236,0.9) 40%, rgba(108,16,188,0.92) 70%, rgba(251,127,5,0.78) 100%), linear-gradient(145deg, rgba(255,255,255,0.16) 0%, rgba(225,214,255,0.08) 100%), rgba(108,16,188,0.9)",
  boxShadow:
    "inset 0 2px 5px rgba(255,255,255,0.58), inset 0 -4px 8px rgba(31,10,59,0.24), 0 10px 25px -8px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.18) inset, 0 0 0 2px rgba(255,255,255,0.08)",
  "&:hover": {
    ...sharedButtonBase["&:hover"],
    background:
      "radial-gradient(150% 150% at 10% 20%, rgba(255,255,255,0.68) 0%, rgba(255,255,255,0) 60%), linear-gradient(125deg, rgba(150,76,224,0.98) 0%, rgba(190,136,244,0.92) 48%, rgba(116,26,196,0.92) 76%, rgba(251,127,5,0.82) 100%), rgba(108,16,188,0.94)",
    boxShadow:
      "inset 0 3px 8px rgba(255,255,255,0.78), inset 0 -4px 8px rgba(31,10,59,0.15), 0 18px 30px -10px rgba(0,0,0,0.56), 0 0 0 1px rgba(255,255,255,0.24) inset, 0 0 0 2px rgba(255,255,255,0.12)",
  },
};

export const greenLiquidButtonSx = {
  ...sharedButtonBase,
  background:
    "radial-gradient(140% 140% at 0% 20%, rgba(255,255,255,0.56) 0%, rgba(255,255,255,0) 52%), linear-gradient(125deg, rgba(34,197,94,0.95) 0%, rgba(74,222,128,0.9) 42%, rgba(0,200,120,0.88) 100%), linear-gradient(145deg, rgba(255,255,255,0.16) 0%, rgba(190,255,220,0.08) 100%), rgba(0,200,120,0.88)",
  boxShadow:
    "inset 0 2px 5px rgba(255,255,255,0.58), inset 0 -4px 8px rgba(0,70,40,0.22), 0 10px 25px -8px rgba(0,0,0,0.42), 0 0 0 1px rgba(255,255,255,0.18) inset, 0 0 0 2px rgba(255,255,255,0.08)",
  "&:hover": {
    ...sharedButtonBase["&:hover"],
    background:
      "radial-gradient(150% 150% at 10% 20%, rgba(255,255,255,0.68) 0%, rgba(255,255,255,0) 58%), linear-gradient(125deg, rgba(52,209,114,0.98) 0%, rgba(110,231,154,0.92) 50%, rgba(0,200,120,0.9) 100%), rgba(0,200,120,0.92)",
    boxShadow:
      "inset 0 3px 8px rgba(255,255,255,0.78), inset 0 -4px 8px rgba(0,70,40,0.16), 0 18px 30px -10px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.24) inset, 0 0 0 2px rgba(255,255,255,0.12)",
  },
};

export const smallPurpleLiquidButtonSx = {
  ...purpleLiquidButtonSx,
  px: 1.75,
  py: 0.55,
  fontSize: 12,
  borderRadius: "100px",
  minWidth: "auto",
  textTransform: "none",
};

/** Monochrome glass button – no gradient, no heavy insets, glassmorphism only. */
export const monochromeGlassButtonSx = {
  position: "relative",
  overflow: "hidden",
  borderRadius: "100px",
  fontSize: "clamp(10px, 2.5vw, 16px)",
  px: 3,
  py: 1.1,
  color: "#fff",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.15)",
  background: "rgba(255, 255, 255, 0.18)",
  backdropFilter: "blur(16px) saturate(180%)",
  WebkitBackdropFilter: "blur(16px) saturate(180%)",
  border: "1px solid rgba(255, 255, 255, 0.35)",
  boxShadow: "0 8px 24px -8px rgba(0, 0, 0, 0.28)",
  transition: "transform 0.2s ease, background 0.25s ease, box-shadow 0.25s ease",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.26)",
    boxShadow: "0 12px 28px -8px rgba(0, 0, 0, 0.35)",
    transform: "translateY(-2px)",
  },
  "&.Mui-disabled": {
    color: "rgba(255, 255, 255, 0.8)",
    opacity: 0.7,
  },
};

/** Monochrome glass icon button (e.g. Share on results page). */
export const monochromeGlassIconButtonSx = {
  position: "relative",
  overflow: "hidden",
  borderRadius: "100px",
  px: 3,
  py: 1.1,
  color: "#fff",
  background: "rgba(255, 255, 255, 0.18)",
  backdropFilter: "blur(16px) saturate(180%)",
  WebkitBackdropFilter: "blur(16px) saturate(180%)",
  border: "1px solid rgba(255, 255, 255, 0.35)",
  boxShadow: "0 8px 24px -8px rgba(0, 0, 0, 0.28)",
  transition: "background 0.25s ease, box-shadow 0.25s ease",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.26)",
    boxShadow: "0 12px 28px -8px rgba(0, 0, 0, 0.35)",
  },
};

/** Glass button – primary (orange) tint. */
export const monochromeGlassPrimaryButtonSx = {
  ...monochromeGlassButtonSx,
  background: "rgba(251, 127, 5, 0.78)",
  border: "1px solid rgba(255, 200, 140, 0.7)",
  "&:hover": {
    ...monochromeGlassButtonSx["&:hover"],
    background: "rgba(251, 127, 5, 0.88)",
  },
};

/** Glass button – secondary (purple) tint. */
export const monochromeGlassSecondaryButtonSx = {
  ...monochromeGlassButtonSx,
  background: "rgba(108, 16, 188, 0.78)",
  border: "1px solid rgba(170, 110, 236, 0.7)",
  "&:hover": {
    ...monochromeGlassButtonSx["&:hover"],
    background: "rgba(108, 16, 188, 0.88)",
  },
};

/** Glass icon button – WhatsApp green tint (Share on results page). */
export const monochromeGlassGreenButtonSx = {
  ...monochromeGlassIconButtonSx,
  background: "rgba(37, 211, 102, 0.78)",
  border: "1px solid rgba(72, 230, 130, 0.75)",
  "&:hover": {
    ...monochromeGlassIconButtonSx["&:hover"],
    background: "rgba(37, 211, 102, 0.88)",
  },
};

export const liquidFormLabelSx = {
  color: "rgba(255,255,255,0.92)",
  fontSize: { xs: 14, sm: 16 },
  fontWeight: 500,
  letterSpacing: "-0.01em",
  textShadow: "0 1px 4px rgba(0,0,0,0.14)",
};

const liquidOutlinedInputRootStyles = {
  position: "relative",
  overflow: "hidden",
  borderRadius: "22px",
  color: "rgba(255,255,255,0.96)",
  background:
    "radial-gradient(140% 120% at 0% 15%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%), linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.08)), rgba(255,255,255,0.12)",
  backdropFilter: "blur(18px) saturate(190%)",
  WebkitBackdropFilter: "blur(18px) saturate(190%)",
  boxShadow:
    "inset 0 2px 4px rgba(255,255,255,0.28), inset 0 -4px 8px rgba(0,0,0,0.14), 0 12px 22px -12px rgba(0,0,0,0.32)",
  "& fieldset": {
    border: "none",
  },
  "&:hover fieldset": {
    border: "none",
  },
  "&.Mui-focused fieldset": {
    border: "none",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    height: "52%",
    borderRadius: "inherit",
    background:
      "linear-gradient(rgba(255,255,255,0.42), rgba(255,255,255,0.03))",
    opacity: 0.55,
    pointerEvents: "none",
  },
};

export const liquidFieldSx = {
  "& .MuiOutlinedInput-root": liquidOutlinedInputRootStyles,
  "&.MuiOutlinedInput-root": liquidOutlinedInputRootStyles,
  "& .MuiInputBase-input, & .MuiSelect-select": {
    position: "relative",
    zIndex: 1,
    py: 1.55,
    px: 2,
    fontSize: "1rem",
    color: "rgba(255,255,255,0.96)",
    textShadow: "0 1px 4px rgba(0,0,0,0.14)",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "rgba(255,255,255,0.68)",
    opacity: 1,
  },
  "& .MuiInputAdornment-root, & .MuiInputAdornment-root *": {
    color: "rgba(255,255,255,0.78)",
  },
  "& .MuiSelect-icon": {
    color: "rgba(255,255,255,0.82)",
  },
  "& .MuiFormHelperText-root": {
    color: "rgba(255,255,255,0.76)",
    ml: 1,
    mt: 0.75,
  },
};

export const liquidMenuProps = {
  PaperProps: {
    sx: {
      mt: 1,
      borderRadius: "22px",
      background:
        "linear-gradient(145deg, rgba(42,19,91,0.82), rgba(76,29,149,0.72))",
      backdropFilter: "blur(22px) saturate(180%)",
      WebkitBackdropFilter: "blur(22px) saturate(180%)",
      color: "white",
      boxShadow: "0 18px 40px rgba(0,0,0,0.28)",
      "& .MuiMenuItem-root": {
        borderRadius: "14px",
        mx: 0.75,
        my: 0.25,
      },
      "& .MuiMenuItem-root:hover": {
        background: "rgba(255,255,255,0.12)",
      },
      "& .Mui-selected": {
        background: "rgba(255,255,255,0.16) !important",
      },
    },
  },
};

export const liquidPanelDarkSx = {
  position: "relative",
  overflow: "hidden",
  background:
    "radial-gradient(160% 120% at 0% 0%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 50%), linear-gradient(145deg, rgba(42,19,91,0.46), rgba(108,16,188,0.28))",
  backdropFilter: "blur(26px) saturate(190%)",
  WebkitBackdropFilter: "blur(26px) saturate(190%)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.24), 0 20px 50px rgba(0,0,0,0.24)",
  borderRadius: 4,
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.04) 42%, rgba(255,255,255,0))",
    pointerEvents: "none",
  },
};

export const liquidPanelLightSx = {
  position: "relative",
  overflow: "hidden",
  background:
    "radial-gradient(160% 120% at 0% 0%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 48%), linear-gradient(145deg, rgba(255,255,255,0.28), rgba(254,229,205,0.24))",
  backdropFilter: "blur(26px) saturate(190%)",
  WebkitBackdropFilter: "blur(26px) saturate(190%)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.24), 0 20px 50px rgba(42,19,91,0.18)",
  borderRadius: 4,
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.24), rgba(255,255,255,0.06) 42%, rgba(255,255,255,0))",
    pointerEvents: "none",
  },
};

export const liquidIconButtonSx = {
  position: "relative",
  overflow: "hidden",
  width: 40,
  height: 40,
  borderRadius: "100px",
  color: "white",
  background:
    "radial-gradient(140% 120% at 0% 20%, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0) 55%), rgba(255,255,255,0.12)",
  backdropFilter: "blur(14px) saturate(180%)",
  WebkitBackdropFilter: "blur(14px) saturate(180%)",
  boxShadow:
    "inset 0 1px 2px rgba(255,255,255,0.34), 0 10px 22px -12px rgba(0,0,0,0.28)",
  "&:hover": {
    background:
      "radial-gradient(140% 120% at 0% 20%, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0) 55%), rgba(255,255,255,0.18)",
  },
};

export const liquidToggleTrackSx = {
  position: "relative",
  p: "6px",
  minWidth: 132,
  borderRadius: "999px",
  background:
    "radial-gradient(150% 140% at 0% 15%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 55%), rgba(255,255,255,0.12)",
  backdropFilter: "blur(18px) saturate(190%)",
  WebkitBackdropFilter: "blur(18px) saturate(190%)",
  boxShadow:
    "inset 0 2px 4px rgba(255,255,255,0.24), inset 0 -4px 8px rgba(0,0,0,0.14), 0 10px 22px -12px rgba(0,0,0,0.28)",
};

export const liquidTogglePillSx = {
  position: "absolute",
  top: 6,
  height: "calc(100% - 12px)",
  borderRadius: "999px",
  background:
    "radial-gradient(150% 150% at 0% 20%, rgba(255,255,255,0.56) 0%, rgba(255,255,255,0) 55%), linear-gradient(125deg, rgba(136,56,214,0.92), rgba(251,127,5,0.78))",
  backdropFilter: "blur(14px) saturate(200%)",
  WebkitBackdropFilter: "blur(14px) saturate(200%)",
  boxShadow:
    "inset 0 2px 5px rgba(255,255,255,0.54), inset 0 -4px 8px rgba(31,10,59,0.18), 0 8px 18px -10px rgba(0,0,0,0.34)",
  transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  pointerEvents: "none",
};

/** Liquid glass loader container (circular). */
export const liquidLoaderSx = (size = 60) => ({
  position: "relative",
  overflow: "hidden",
  width: size,
  height: size,
  borderRadius: "50%",
  background:
    "radial-gradient(140% 120% at 0% 15%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 50%), linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.08)), rgba(255,255,255,0.14)",
  backdropFilter: "blur(18px) saturate(190%)",
  WebkitBackdropFilter: "blur(18px) saturate(190%)",
  boxShadow:
    "inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -4px 8px rgba(0,0,0,0.12), 0 12px 22px -12px rgba(0,0,0,0.28)",
  border: "1px solid rgba(255,255,255,0.18)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    height: "52%",
    borderRadius: "inherit",
    background:
      "linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.04))",
    opacity: 0.6,
    pointerEvents: "none",
  },
});

/** Spinning ring inside loader. Requires liquidLoaderSpin in globals.css */
export const liquidLoaderRingSx = (size = 60) => ({
  position: "relative",
  zIndex: 1,
  width: size * 0.6,
  height: size * 0.6,
  borderRadius: "50%",
  border: "3px solid transparent",
  borderTopColor: "rgba(251,127,5,0.9)",
  borderRightColor: "rgba(108,16,188,0.5)",
  animation: "liquidLoaderSpin 0.8s linear infinite",
});

/** Horizontal liquid glass progress bar – track. */
export const liquidProgressTrackSx = {
  position: "relative",
  overflow: "hidden",
  width: "100%",
  height: 12,
  borderRadius: "999px",
  background:
    "radial-gradient(140% 120% at 0% 50%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%), linear-gradient(90deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06)), rgba(255,255,255,0.08)",
  backdropFilter: "blur(14px) saturate(190%)",
  WebkitBackdropFilter: "blur(14px) saturate(190%)",
  boxShadow:
    "inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.1)",
  border: "1px solid rgba(255,255,255,0.15)",
};

/** Horizontal liquid glass progress bar – fill. */
export const liquidProgressFillSx = {
  position: "absolute",
  left: 0,
  top: 0,
  bottom: 0,
  borderRadius: "999px",
  minWidth: "4%",
  background:
    "linear-gradient(90deg, rgba(251,127,5,0.9), rgba(255,164,26,0.85) 40%, rgba(108,16,188,0.8) 100%)",
  backdropFilter: "blur(8px) saturate(180%)",
  WebkitBackdropFilter: "blur(8px) saturate(180%)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
  transition: "width 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
};

/** Primary submit button – liquid glass (for LoadingButton). */
export const liquidPrimaryButtonSx = {
  borderRadius: "100px",
  background:
    "linear-gradient(125deg, rgba(251,127,5,0.92), rgba(255,164,26,0.88) 40%, rgba(136,56,214,0.85) 100%)",
  backdropFilter: "blur(14px) saturate(180%)",
  WebkitBackdropFilter: "blur(14px) saturate(180%)",
  color: "white",
  boxShadow:
    "inset 0 2px 4px rgba(255,255,255,0.28), 0 10px 24px -8px rgba(108,16,188,0.35)",
  border: "1px solid rgba(255,255,255,0.2)",
  "&:hover": {
    background:
      "linear-gradient(125deg, rgba(251,127,5,0.96), rgba(255,164,26,0.92) 40%, rgba(136,56,214,0.9) 100%)",
    boxShadow:
      "inset 0 2px 4px rgba(255,255,255,0.3), 0 12px 28px -8px rgba(108,16,188,0.4)",
  },
  "&:disabled": {
    opacity: 0.85,
    color: "rgba(255,255,255,0.9)",
  },
};
