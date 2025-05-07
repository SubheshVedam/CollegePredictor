"use client";

import { useState } from "react";
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

export default function ShareButton() {
  const [openFallback, setOpenFallback] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const currentUrl = "https://www.thecollegepredictor.com/";
  const shareText = "Check out this FREE Rank Predictor website!";

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          text: shareText,
          url: currentUrl,
        });
      } else {
        setOpenFallback(true);
      }
    } catch (err) {
      console.log("Share was canceled");
    }
  };

  const copyToClipboard = () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(currentUrl);
        setSnackbarOpen(true);
      }
    } catch (err) {
      setSnackbarOpen(true);
    } finally {
      setSnackbarOpen(true);
      setOpenFallback(false);
    }
  };

  const socialShares = [
    {
      name: "WhatsApp",
      icon: <WhatsApp color="secondary" />,
      url: `https://wa.me/?text=${encodeURIComponent(
        `${shareText} ${currentUrl}`
      )}`,
    },
    {
      name: "Facebook",
      icon: <Facebook color="secondary" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
      )}`,
    },
    {
      name: "Twitter",
      icon: <Twitter color="secondary" />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        currentUrl
      )}&text=${encodeURIComponent(shareText)}`,
    },
    {
      name: "LinkedIn",
      icon: <LinkedIn color="secondary" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        currentUrl
      )}`,
    },
    {
      name: "Email",
      icon: <Email color="secondary" />,
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
        sx={{
          backgroundColor: "darkgreen",
          borderRadius: 20,
          px: 2,
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: "0.7rem", sm: "0.7rem", md: "0.9rem" }, // Responsive text size
          }}
        >
          Share this FREE Predictor Tool
        </Typography>
        <WhatsApp sx={{ pl: 1, color: "white" }} />
      </IconButton>

      {/* Fallback Dialog */}
      <Dialog open={openFallback} onClose={() => setOpenFallback(false)}>
        <DialogTitle>Share this page</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={currentUrl}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={copyToClipboard}>
                    <ContentCopy />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box
            sx={{
              mt: 2,
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
                sx={{
                  color: "primary.main",
                  flexDirection: "column",
                  width: 80,
                  height: 80,
                }}
              >
                {social.icon}
                <Typography
                  variant="caption"
                  sx={{ mt: 0.5 }}
                  color="secondary"
                >
                  {social.name}
                </Typography>
              </IconButton>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => setOpenFallback(false)}>
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
