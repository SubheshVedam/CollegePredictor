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
      title: "Early Insights",
      description:
        "Anticipate your All India Rank (AIR) before official results are declared.",
    },
    {
      title: "College Matchmaking",
      description:
        "Identify the colleges most suited to your predicted rank, simplifying the decision-making process.",
    },
    {
      title: "Personalised Guidance",
      description:
        "Get tailored insights based on category, percentile, and past performance trends.",
    },
  ];

  const benefits = [
    {
      title: "Accurate Rank Estimation",
      description: "Predict your competitive standing among JEE aspirants.",
    },
    {
      title: "Strategic College Planning",
      description:
        "Proactively identify colleges where you're most likely to secure admission.",
    },
    {
      title: "Informed Decision-Making",
      description:
        "Gain early insights into rank vs. college trends for better academic planning.",
    },
    {
      title: "Preparation Support",
      description:
        "Use rank predictions to identify areas of improvement for your next mock test or exam attempt.",
    },
    {
      title: "Comprehensive Guidance",
      description:
        "Research fees, courses, and placement opportunities at predicted colleges.",
    },
  ];

  const steps = [
    {
      title: "Input Your Marks",
      description: "Enter your expected scores or percentile.",
    },
    {
      title: "Data Analysis",
      description:
        "The tool compares your performance with historical JEE data, including previous years' cutoffs, score distributions, and category-based trends.",
    },
    {
      title: "Rank and College Prediction",
      description:
        "It estimates your rank and matches you with colleges based on seat availability, cutoff trends, and your predicted ranks.",
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 6}}>
      <Box>
        <Typography variant="body1" paragraph>
          Estimate Your Rank and Discover Potential Colleges Based on Your Marks
          or Percentile for JEE Main 2025. This enhanced tool provides insights
          into marks vs. rank and percentile vs. rank trends, along with
          category-specific predictions, helping you navigate your academic
          journey effectively.
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
          JEE College and Rank Predictor 2025 (FREE)
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
          How Does the JEE College and Rank Predictor Work?
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
          Benefits of the JEE College and Rank Predictor 2025
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
      Take the next step in your JEE journey—use the <strong>College and Rank Predictor 2025</strong> today to set yourself up for academic success!
        </Typography>
    </Container>
  );
}
