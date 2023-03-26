import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Pagination from "@mui/material/Pagination";

const useStyles = makeStyles({
  tableContainer: {
    marginTop: 20,
    maxHeight: 500,
  },
});
  

const GitHubActionsStats = () => {
  const classes = useStyles();
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [repo, setRepo] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchRuns = async () => {
      try {
        const response = await fetch(
          `${process.env.GIT_API_URL}/repos/${username}/${repo}/actions/runs?page=${page}&per_page=${rowsPerPage}`
        );
        const data = await response.json();
        console.log("data=", data);
        if (data.message === "Not Found") {
          throw new Error("No results found.");
        }
        setRuns(data.workflow_runs);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setPage(1)
        setLoading(false);
      }
    };
    if (page !== 0) {
      setLoading(true);
      fetchRuns();
    }
  }, [page, rowsPerPage]);

  const handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (!!username && !!repo) {
      setPage(1);
      setLoading(true);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <div>
      <h2>Recent GitHub Actions Workflow Runs</h2>
      <div style={{ display: "flex", marginBottom: 10 }}>
        <TextField
          label="Username"
          variant="outlined"
          size="small"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Repository Name"
          variant="outlined"
          size="small"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          style={{ marginLeft: 10 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          onKeyDown={handleEnterPress}
          disabled={!username || !repo}
          style={{ marginLeft: 10 }}
        >
          Search
        </Button>
      </div>
      {loading && <p>Loading...</p>}
      {!loading && runs?.length === 0 && <p>No runs found.</p>}
      {!loading && runs?.length > 0 && (
        <div>
          <TableContainer
            component={Paper}
            className={classes.tableContainer}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Conclusion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {runs.map((run) => (
                  <TableRow key={run.id}>
                    <TableCell>{run.id}</TableCell>
                    <TableCell>{run.name}</TableCell>
                    <TableCell>{run.status}</TableCell>
                    <TableCell>{run.conclusion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={10}
            page={page}
            onChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{ marginTop: 20 }}
          />
        </div>
      )}
    </div>
  );
  
}


export default GitHubActionsStats;
