"use client";

import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  InputAdornment,
  Box,
  Typography,
} from "@mui/material";
import {
  ContentCopy,
  Close,
  Facebook,
  Twitter,
  Email,
  LinkedIn,
  WhatsApp,
} from "@mui/icons-material";
import {
  greenLiquidButtonSx,
  liquidFieldSx,
  liquidIconButtonSx,
  smallPurpleLiquidButtonSx,
} from "./liquidGlassStyles";

const glassDialogPaperSx = {
  position: "relative",
  overflow: "hidden",
  borderRadius: "30px",
  border: "1px solid rgba(255, 255, 255, 0.34)",
  background:
    "linear-gradient(145deg, rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0.18))",
  backdropFilter: "saturate(200%) blur(40px)",
  WebkitBackdropFilter: "saturate(200%) blur(40px)",
  boxShadow:
    "0 30px 80px rgba(42, 19, 91, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.35)",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.06) 38%, rgba(108, 16, 188, 0.08) 100%)",
    pointerEvents: "none",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: -80,
    left: -40,
    width: 220,
    height: 220,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255, 255, 255, 0.26), transparent 70%)",
    pointerEvents: "none",
  },
};

const glassSocialIconSx = {
  flexDirection: "column",
  gap: 1,
  width: 92,
  height: 96,
  borderRadius: "24px",
  border: "1px solid rgba(255, 255, 255, 0.28)",
  background:
    "linear-gradient(145deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.12))",
  backdropFilter: "saturate(180%) blur(26px)",
  WebkitBackdropFilter: "saturate(180%) blur(26px)",
  boxShadow:
    "inset 0 1px 0 rgba(255, 255, 255, 0.26), 0 12px 28px rgba(42, 19, 91, 0.12)",
  transition: "all 0.24s ease",
  "&:hover": {
    background:
      "linear-gradient(145deg, rgba(255, 255, 255, 0.38), rgba(255, 255, 255, 0.18))",
    borderColor: "rgba(255, 255, 255, 0.38)",
    transform: "translateY(-2px)",
    boxShadow:
      "inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 16px 32px rgba(42, 19, 91, 0.16)",
  },
};

const glassIconOrbSx = {
  width: 46,
  height: 46,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background:
    "linear-gradient(145deg, rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0.16))",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  backdropFilter: "saturate(180%) blur(18px)",
  WebkitBackdropFilter: "saturate(180%) blur(18px)",
  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.22)",
};

export default function ShareButton({ variant }) {
  const [openFallback, setOpenFallback] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const currentUrl = "https://www.thecollegepredictor.com/";
  const shareText = "Check out this FREE Rank Predictor website!";

  const handleShare = async () => {
    setOpenFallback(true);
  };

  const handleCopySuccess = () => {
    setSnackbarOpen(true);
    setOpenFallback(false);
  };

  const socialShares = [
    {
      name: "WhatsApp",
      icon: WhatsApp,
      iconColor: "#22c55e",
      url: `https://wa.me/?text=${encodeURIComponent(
        `${shareText} ${currentUrl}`
      )}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      iconColor: "#2563eb",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
      )}`,
    },
    {
      name: "Twitter",
      icon: Twitter,
      iconColor: "#0f172a",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        currentUrl
      )}&text=${encodeURIComponent(shareText)}`,
    },
    {
      name: "LinkedIn",
      icon: LinkedIn,
      iconColor: "#0a66c2",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        currentUrl
      )}`,
    },
    {
      name: "Email",
      icon: Email,
      iconColor: "#ea580c",
      url: `mailto:?body=${encodeURIComponent(
        `${shareText} ${currentUrl}`
      )}&subject=${encodeURIComponent(shareText)}`,
    },
  ];

  return (
    <>
      <IconButton
        onClick={handleShare}
        aria-label="Share"
        sx={greenLiquidButtonSx}
      >
        <Typography
          sx={{
            color: "white",
            fontWeight: 600,
            fontSize: { xs: 12, sm: 14 },
          }}
        >
          Share this FREE Predictor Tool
        </Typography>
        <WhatsApp sx={{ color: "white" }} />
      </IconButton>

      {/* Fallback Dialog */}
      <Dialog
        open={openFallback}
        onClose={() => setOpenFallback(false)}
        slotProps={{
          backdrop: {
            sx: {
              background:
                "linear-gradient(180deg, rgba(42, 19, 91, 0.24), rgba(42, 19, 91, 0.38))",
              backdropFilter: "saturate(180%) blur(16px)",
              WebkitBackdropFilter: "saturate(180%) blur(16px)",
            },
          },
        }}
        PaperProps={{
          sx: glassDialogPaperSx,
        }}
      >
        <DialogTitle
          sx={{
            position: "relative",
            zIndex: 1,
            pb: 1,
            color: "#1f1140",
            fontWeight: 600,
            fontSize: { xs: 22, sm: 26 },
          }}
        >
          Share this page
        </DialogTitle>
        <DialogContent sx={{ position: "relative", zIndex: 1, pt: 1 }}>
          <Typography
            sx={{
              mb: 1.5,
              color: "rgba(31, 17, 64, 0.78)",
              fontSize: 14,
            }}
          >
            Send the predictor link with a frosted Apple-style share sheet.
          </Typography>
          <TextField
            fullWidth
            value={currentUrl}
            margin="normal"
            variant="outlined"
            size="medium"
            sx={{
              ...liquidFieldSx,
              "& .MuiOutlinedInput-root": {
                ...liquidFieldSx["& .MuiOutlinedInput-root"],
                color: "#1f1140",
              },
              "& .MuiInputBase-input": {
                ...liquidFieldSx["& .MuiInputBase-input, & .MuiSelect-select"],
                py: 1.5,
                color: "#1f1140",
                textShadow: "none",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CopyToClipboard text={currentUrl} onCopy={handleCopySuccess}>
                    <IconButton
                      sx={{
                        ...liquidIconButtonSx,
                        width: 34,
                        height: 34,
                        color: "#1f1140",
                      }}
                    >
                      <ContentCopy />
                    </IconButton>
                  </CopyToClipboard>
                </InputAdornment>
              ),
            }}
          />

          <Box
            sx={{
              mt: 2.5,
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            {socialShares.map((social) => (
              <IconButton
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Share on ${social.name}`}
                sx={glassSocialIconSx}
              >
                <Box sx={glassIconOrbSx}>
                  <social.icon sx={{ color: social.iconColor, fontSize: 26 }} />
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    mt: 0.25,
                    color: "rgba(31, 17, 64, 0.82)",
                    fontWeight: 600,
                    fontSize: 12,
                  }}
                >
                  {social.name}
                </Typography>
              </IconButton>
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ position: "relative", zIndex: 1, px: 3, pb: 2.5 }}>
          <Button
            color="secondary"
            onClick={() => setOpenFallback(false)}
            sx={{
              ...smallPurpleLiquidButtonSx,
              px: 2.5,
              color: "#fff",
              textShadow: "0 1px 3px rgba(0,0,0,0.2)",
              background:
                "radial-gradient(140% 140% at 0% 20%, rgba(255,255,255,0.56) 0%, rgba(255,255,255,0) 52%), linear-gradient(125deg, rgba(211,47,47,0.95) 0%, rgba(244,67,54,0.92) 42%, rgba(198,40,40,0.9) 100%), linear-gradient(145deg, rgba(255,255,255,0.16) 0%, rgba(255,220,220,0.08) 100%), rgba(198,40,40,0.9)",
              boxShadow:
                "inset 0 2px 5px rgba(255,255,255,0.58), inset 0 -4px 8px rgba(80,20,20,0.24), 0 10px 25px -8px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.18) inset, 0 0 0 2px rgba(255,255,255,0.08)",
              "&:hover": {
                background:
                  "radial-gradient(150% 150% at 10% 20%, rgba(255,255,255,0.68) 0%, rgba(255,255,255,0) 60%), linear-gradient(125deg, rgba(224,60,60,0.98) 0%, rgba(255,90,90,0.92) 48%, rgba(198,40,40,0.92) 100%), rgba(198,40,40,0.94)",
                boxShadow:
                  "inset 0 3px 8px rgba(255,255,255,0.78), inset 0 -4px 8px rgba(80,20,20,0.15), 0 18px 30px -10px rgba(0,0,0,0.56), 0 0 0 1px rgba(255,255,255,0.24) inset, 0 0 0 2px rgba(255,255,255,0.12)",
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setSnackbarOpen(false)}
              sx={{ "&:hover": { backgroundColor: "transparent" } }}
            >
              <Close fontSize="small" />
            </IconButton>
          }
        >
          Link copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
}
