import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";

const Login = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallBack, {
    username: "",
    password: "",
  });

  function disabled() {
    if (values.username !== "" && values.password !== "") {
      return false;
    } else {
      return true;
    }
  }

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      console.log(userData);
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallBack() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
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
          label="Password"
          placeholder="Password..."
          error={errors.password ? true : false}
          type="password"
          name="password"
          value={values.password}
          onChange={onChange}
        ></Form.Input>
        <Button type="submit" primary disabled={disabled()}>
          Login
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

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
