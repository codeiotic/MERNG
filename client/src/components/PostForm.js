import React from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Card } from "semantic-ui-react";
import Skeleton from "react-loading-skeleton";

import { useForm } from "../util/hooks";
import { FETCH_POSTS_QUERY } from "../util/graphql";

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error, loading }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      let newData = [...data.getPosts];
      newData = [result.data.createPost, ...newData];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: {
            newData,
          },
        },
      });
      values.body = "";
    },
  });

  function disabled() {
    if (values.body === "") {
      return true;
    } else {
      return false;
    }
  }

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        {loading ? (
          <Card fluid>
            <Card.Content>
              <Skeleton count={4} />
            </Card.Content>
            <Card.Content extra>
              <Skeleton count={1} />
            </Card.Content>
          </Card>
        ) : (
          <div>
            <h2>Create a post:</h2>
            <Form.Field>
              <Form.Input
                placeholder="Hi World!"
                name="body"
                onChange={onChange}
                value={values.body}
                error={error ? true : false}
              />
              <Button type="submit" color="teal" disabled={disabled()}>
                Submit
              </Button>
            </Form.Field>
          </div>
        )}
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: "20px" }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
