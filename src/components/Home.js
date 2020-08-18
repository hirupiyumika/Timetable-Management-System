import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import LogItem from "./LogItem";
import AddLogItem from "./AddLogItem";
import { Link } from "react-router-dom";
import { LogConsumer } from "./../context/context";

const Home = () => {
  return (
    <LogConsumer>
      {(value) => {
        const { logs, alert, deleteItem, addItem } = value;
        return (
          <Container>
            <AddLogItem addItem={addItem} />
            {alert.show && (
              <Alert variant={alert.variant}>{alert.message}</Alert>
            )}
            <Table>
              <thead>
                <tr>
                  <th>Priority</th>
                  <th>Log Text</th>
                  <th>User</th>
                  <th>Create</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <LogItem key={log._id} log={log} deleteItem={deleteItem} />
                ))}
              </tbody>
            </Table>
            <Link to="/test">Test</Link>
          </Container>
        );
      }}
    </LogConsumer>
  );
};

export default Home;
