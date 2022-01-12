import React, { useState } from "react";
// import MainLayout from "../layouts/Main";
import MainLayout from "../layouts/V2/Main_V2";
import Addusers from "../components/users/AddUser";
import Table from "../components/users/Table";
import UserFilter from "../components/users/UserFilter";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserslist } from "../store/actions/Users";
const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const { token } = JSON.parse(localStorage?.getItem("epitomeUser"));
    console.log("Token", token);
    if (token) {
      dispatch(getUserslist(null));
    }
  }, [dispatch]);
  return (
    <MainLayout>
      <UserFilter />
      <Table />
      <Addusers />
    </MainLayout>
  );
};

export default Users;
