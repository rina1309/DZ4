import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchUsersFailure, fetchUsersRequest,
    fetchUsersSuccess
} from "../redux/userSlice";

function UsersListPage() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.users);

  const handleGetData = () => {
    dispatch(fetchUsersRequest());

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchUsersSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error));
        console.error(error);
      });
  };

  return (
    <Container>
      <Button onClick={handleGetData} variant="primary" className="mb-3">
        Получить данные
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default UsersListPage;
