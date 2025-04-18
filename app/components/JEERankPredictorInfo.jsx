"use client";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
} from "@mui/material";
import {
  Calculate,
  Insights,
  School,
  TrendingUp,
  Checklist,
  Verified,
  Star,
  Help,
  ShowChart,
} from "@mui/icons-material";

export default function JEERankPredictorInfo() {
  const features = [
    {
      icon: <Calculate />,
      title: "AI-Powered Rank Prediction",
      description:
        "Advanced algorithms analyse your marks and percentile to generate accurate rank estimates.",
    },
    {
      icon: <Insights />,
      title: "Early Insights",
      description:
        "Anticipate your All India Rank (AIR) before official results are declared.",
    },
    {
      icon: <School />,
      title: "College Matchmaking",
      description:
        "Identify the colleges most suited to your predicted rank, simplifying the decision-making process.",
    },
    {
      icon: <TrendingUp />,
      title: "Personalised Guidance",
      description:
        "Get tailored insights based on category, percentile, and past performance trends.",
    },
  ];

  const benefits = [
    "Accurate Rank Estimation among JEE aspirants",
    "Strategic College Planning based on cutoff trends",
    "Informed Decision-Making for better academic planning",
    "Preparation Support for next mock tests or exams",
    "Comprehensive college information (fees, courses, placements)",
  ];

  const steps = [
    {
      icon: <ShowChart />,
      title: "Input Your Marks",
      description: "Enter your expected scores or percentile.",
    },
    {
      icon: <Insights />,
      title: "Data Analysis",
      description:
        "The tool compares your performance with historical JEE data, including previous years' cutoffs, score distributions, and category-based trends.",
    },
    {
      icon: <School />,
      title: "Rank and College Prediction",
      description:
        "It estimates your rank and matches you with colleges based on seat availability, cutoff trends, and your predicted ranks.",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 5 }}>
        <Typography variant="h3" gutterBottom fontWeight="bold">
          JEE College and Rank Predictor 2025
        </Typography>
        <Typography variant="h5" gutterBottom>
          Estimate Your Rank and Discover Potential Colleges Based on Your Marks or Percentile for JEE Main 2025.
        </Typography>
        <Typography variant="body1" paragraph>
          This enhanced tool provides insights into marks vs. rank and percentile vs. rank trends, along with
          category-specific predictions, helping you navigate your academic journey effectively.
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap" my={2}>
          <Chip icon={<Verified />} label="Crafted by Google & Microsoft Engineers" color="primary" />
          <Chip icon={<Star />} label="FREE Tool" color="success" />
        </Box>
        <Typography variant="body1" paragraph>
          Crafted by experts of Google & Microsoft Engineers, this tool empowers you to make informed decisions during your JEE preparation and admissions process.
        </Typography>
      </Paper>

      <Box mb={6}>
        <Typography variant="h4" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card elevation={2}>
                <CardContent>
                  <ListItemIcon sx={{ color: "primary.main", mb: 1 }}>
                    {feature.icon}
                  </ListItemIcon>
                  <Typography variant="h6">{feature.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mb={6}>
        <Typography variant="h4" gutterBottom>
          How Does the JEE College and Rank Predictor Work?
        </Typography>
        <List>
          {steps.map((step, index) => (
            <Box key={index}>
              <ListItem alignItems="flex-start">
                <ListItemIcon>{step.icon}</ListItemIcon>
                <ListItemText primary={step.title} secondary={step.description} />
              </ListItem>
              {index !== steps.length - 1 && <Divider variant="inset" component="li" />}
            </Box>
          ))}
        </List>
      </Box>

      <Box mb={6}>
        <Typography variant="h4" gutterBottom>
          Benefits of the JEE College and Rank Predictor 2025
        </Typography>
        <List>
          {benefits.map((benefit, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <Checklist color="primary" />
              </ListItemIcon>
              <ListItemText primary={benefit} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Paper elevation={3} sx={{ p: 4, textAlign: "center", background: "primary.main", color: "white" }}>
        <Typography variant="h5" gutterBottom>
          Take the next step in your JEE journey
        </Typography>
        <Typography variant="body1">
          Use the College and Rank Predictor 2025 today to set yourself up for academic success!
        </Typography>
      </Paper>
    </Container>
  );
}
