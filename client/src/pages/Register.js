import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";

const Register = (props) => {
  const context = useContext(AuthContext);

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function disabled() {
    if (
      values.username !== "" &&
      values.password !== "" &&
      values.confirmPassword !== "" &&
      values.email !== ""
    ) {
      return false;
    } else {
      return true;
    }
  }

  const [errors, setErrors] = useState({});

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      console.log(userData);
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          error={errors.username ? true : false}
          name="username"
          type="text"
          value={values.username}
          onChange={onChange}
        ></Form.Input>
        <Form.Input
          label="Email"
          placeholder="Email..."
          error={errors.email ? true : false}
          type="email"
          name="email"
          value={values.email}
          onChange={onChange}
        ></Form.Input>
        <Form.Input
          label="Password"
          placeholder="Password..."
          error={errors.password ? true : false}
          type="password"
          name="password"
          value={values.password}
          onChange={onChange}
        ></Form.Input>
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password..."
          error={errors.confirmPassword ? true : false}
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" disabled={disabled()} primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
