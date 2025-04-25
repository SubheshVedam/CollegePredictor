'use client'
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Tabs,
  Tab
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

// Plugin to display percentages on bars
const barPercentagePlugin = {
  id: 'barPercentage',
  afterDatasetsDraw(chart) {
    const { ctx, data } = chart;
    const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
    
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = '#fff';

    chart.getDatasetMeta(0).data.forEach((bar, index) => {
      const value = data.datasets[0].data[index];
      const percentage = ((value / total) * 100).toFixed(1) + '%';
      ctx.fillText(percentage, bar.x, bar.y - 5);
    });
  }
};

// Plugin to display percentages on pie chart
const piePercentagePlugin = {
  id: 'piePercentage',
  afterDatasetsDraw(chart) {
    const { ctx, data } = chart;
    const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
    
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#fff';

    data.datasets[0].data.forEach((value, index) => {
      const { x, y } = chart.getDatasetMeta(0).data[index].tooltipPosition();
      const percentage = ((value / total) * 100).toFixed(1) + '%';
      ctx.fillText(percentage, x, y);
    });
  }
};

const DashBoard = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [utmData, setUtmData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUTMData();
    }
  }, [isAuthenticated]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (
      username === process.env.NEXT_PUBLIC_AUTH_USERNAME &&
      password === process.env.NEXT_PUBLIC_AUTH_PASSWORD
    ) {
      setIsAuthenticated(true);
    } else {
      setError('Invalid credentials');
      setLoading(false);
    }
  };

  const fetchUTMData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/utm-tracking');
      const { data } = await response.json();
      if (data) {
        setUtmData(data);
      } else {
        setError('Failed to fetch UTM data');
      }
    } catch (err) {
      setError('API Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const prepareChartData = (data) => {
    const labels = Object.keys(data || {});
    const values = Object.values(data || {});
    const total = values.reduce((sum, value) => sum + value, 0);
    
    return {
      labels,
      datasets: [{
        data: values,
        backgroundColor: [
          'rgba(144, 202, 249, 0.7)',
          'rgba(244, 143, 177, 0.7)',
          'rgba(174, 213, 129, 0.7)',
          'rgba(255, 213, 79, 0.7)',
          'rgba(255, 138, 101, 0.7)',
        ],
        borderColor: [
          'rgba(144, 202, 249, 1)',
          'rgba(244, 143, 177, 1)',
          'rgba(174, 213, 129, 1)',
          'rgba(255, 213, 79, 1)',
          'rgba(255, 138, 101, 1)',
        ],
        borderWidth: 1,
      }],
      total
    };
  };

  const campaignChartData = prepareChartData(utmData?.byCampaign);
  const mediumChartData = prepareChartData(utmData?.byMedium);

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.chart.data.total;
            const percentage = ((value / total) * 100).toFixed(1) + '%';
            return `${label}: ${value} (${percentage})`;
          }
        }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.chart.data.total;
            const percentage = ((value / total) * 100).toFixed(1) + '%';
            return `${label}: ${value} (${percentage})`;
          }
        }
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
              <Typography component="h1" variant="h5" align="center" gutterBottom>
                UTM Analytics Login
              </Typography>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Sign In'}
                </Button>
              </Box>
            </Paper>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h4" component="h1">
            UTM Analytics Dashboard
          </Typography>
          <Button
            variant="contained"
            onClick={fetchUTMData}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            Refresh Data
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading && !utmData ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : utmData ? (
          <>
            <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
              <Tab label="Campaigns" />
              <Tab label="Mediums" />
              <Tab label="Raw Data" />
            </Tabs>

            {tabValue === 0 && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Card elevation={3}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Campaign Distribution (Total: {campaignChartData.total})
                      </Typography>
                      <Box sx={{ height: 400 }}>
                        <Bar
                          data={campaignChartData}
                          options={barOptions}
                          plugins={[barPercentagePlugin]}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card elevation={3}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Campaign Breakdown
                      </Typography>
                      <Box sx={{ height: 400 }}>
                        <Pie
                          data={campaignChartData}
                          options={pieOptions}
                          plugins={[piePercentagePlugin]}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}

            {tabValue === 1 && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Card elevation={3}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Medium Distribution (Total: {mediumChartData.total})
                      </Typography>
                      <Box sx={{ height: 400 }}>
                        <Bar
                          data={mediumChartData}
                          options={barOptions}
                          plugins={[barPercentagePlugin]}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card elevation={3}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Medium Breakdown
                      </Typography>
                      <Box sx={{ height: 400 }}>
                        <Pie
                          data={mediumChartData}
                          options={pieOptions}
                          plugins={[piePercentagePlugin]}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}

            {tabValue === 2 && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card elevation={3}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Campaign Counts
                      </Typography>
                      <Grid container spacing={2}>
                        {Object.entries(utmData.byCampaign).map(([campaign, count]) => (
                          <Grid item xs={6} key={campaign}>
                            <Paper elevation={2} sx={{ p: 2 }}>
                              <Typography variant="subtitle1">{campaign}</Typography>
                              <Typography variant="h4" color="primary">
                                {count}
                              </Typography>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card elevation={3}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Medium Counts
                      </Typography>
                      <Grid container spacing={2}>
                        {Object.entries(utmData.byMedium).map(([medium, count]) => (
                          <Grid item xs={6} key={medium}>
                            <Paper elevation={2} sx={{ p: 2 }}>
                              <Typography variant="subtitle1">{medium}</Typography>
                              <Typography variant="h4" color="secondary">
                                {count}
                              </Typography>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
          </>
        ) : (
          <Typography>No data available</Typography>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default DashBoard;