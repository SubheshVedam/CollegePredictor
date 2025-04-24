"use client";
import {
  Box,
  Container,
  Typography,
  ListItemText,
  List,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export default function JEERankPredictorInfo() {
  const features = [
    {
      title: "AI-Powered Rank Prediction",
      description:
        "Advanced algorithms analyse your marks and percentile to generate accurate rank estimates.",
    },
    {
      title: "College Matchmaking",
      description:
        "Identify the colleges most suited based on your rank, simplifying the decision-making process.",
    },
    {
      title: "Personalised Guidance",
      description:
        "Get tailored insights based on category, percentile, and past performance trends.",
    },
  ];

  const benefits = [
    {
      title: "Precise College Matching",
      description: "Find colleges that align with your actual JEE rank and category.",
    },
    {
      title: "Save Time and Stress",
      description:
        "Skip manual research. Get a clear picture of your options in seconds.",
    },
    {
      title: "Stay Ahead",
      description:
        "Plan your next steps early—whether it’s counselling, course selection, or admission strategy.",
    },
  ];

  const steps = [
    {
      title: "Enter Your JEE Rank",
      description: "Input your All India Rank (AIR) and select your category and home state.",
    },
    {
      title: "Data-Driven Matching",
      description:
        "The tool compares your performance with historical JEE data, including previous years' cutoffs, score distributions, and category-based trends.",
    },
    {
      title: "College Prediction",
      description:
        "Instantly see a list of colleges and branches where you're likely to get admission—customised just for you.",
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 6}}>
      <Box>
        <Typography variant="body1" paragraph>
        Input your JEE Main 2025 rank and unlock a personalised list of engineering colleges and branches you're likely to get into. This powerful tool uses historical cutoffs and category-specific trends to help you make confident, data-driven choices during counselling.
        </Typography>
        <Typography variant="body1" paragraph>
          Crafted by <strong>experts of Google & Microsoft Engineers</strong>,
          this tool empowers you to make informed decisions during your JEE
          preparation and admissions process.
        </Typography>
      </Box>

      {/* Features Section */}
      <Box>
        <Typography variant="h6" sx={{ color: "#6C10BC", fontWeight: "bold" }}>
          JEE College Predictor 2025 (FREE)
        </Typography>
        <List sx={{ mt: 1 }}>
          {features.map((feature, index) => (
            <ListItem key={index} sx={{ py: 0.5 }} alignItems="flex-start">
              <ListItemIcon sx={{ minWidth: 24, mt: "11px" }}>
                <FiberManualRecordIcon sx={{ fontSize: 10, color: "black" }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body1">
                    <strong>{feature.title}:</strong> {feature.description}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
      {/* Numbered Section */}
      <Box>
        <Typography
          variant="h6"
          sx={{ color: "#6C10BC", fontWeight: "bold", mt: 4 }}
        >
          How Does the JEE College Predictor Work?
        </Typography>
        <List sx={{ mt: 1 }}>
          {steps.map((step, index) => (
            <ListItem key={index} alignItems="flex-start" sx={{ py: 1 }}>
              <ListItemIcon sx={{ minWidth: 24, mt: "11px" }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    lineHeight: 1, // Ensures no extra space
                  }}
                >
                  {index + 1}.
                </Typography>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" >
                   <strong> {step.title}:</strong> {step.description}
                  </Typography>
                }
    
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Benefits Section */}
      <Box sx={{mb:2}}>
        <Typography variant="h6" sx={{ color: "#6C10BC", fontWeight: "bold" }}>
          Benefit of the JEE College Predictor 2025
        </Typography>
        <List sx={{ mt: 1 }}>
          {benefits.map((benefit, index) => (
            <ListItem key={index} sx={{ py: 0.5 }} alignItems="flex-start">
              <ListItemIcon sx={{ minWidth: 24, mt: "11px" }}>
                <FiberManualRecordIcon sx={{ fontSize: 10, color: "black" }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body1">
                    <strong>{benefit.title}:</strong> {benefit.description}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Typography variant="body1" paragraph>
      Take the next step in your JEE journey—use the <strong>College Predictor 2025</strong> today to set yourself up for academic success!
        </Typography>
    </Container>
  );
}
