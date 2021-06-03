import { useQuery } from "@apollo/client";
import { Grid, Card, Transition } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import Skeleton from "react-loading-skeleton";
import { useContext } from "react";
import { AuthContext } from "../context/auth";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../util/graphql";

const Home = () => {
  const { user } = useContext(AuthContext);
  const {
    loading,
    error,
    data: { getPosts: post } = {},
  } = useQuery(FETCH_POSTS_QUERY);

  if (error) {
    return (
      <h1 className="page-title">An Error Occurred! Please try again later</h1>
    );
  }

  if (loading) {
    return (
      <div>
        <Grid columns="three" divided>
          <Grid.Row className="page-title">
            <h1>Loading....</h1>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Card fluid>
                <Card.Content>
                  <Skeleton count={4} />
                </Card.Content>
                <Card.Content extra>
                  <Skeleton count={1} />
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card fluid>
                <Card.Content>
                  <Skeleton count={4} />
                </Card.Content>
                <Card.Content extra>
                  <Skeleton count={1} />
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card fluid>
                <Card.Content>
                  <Skeleton count={4} />
                </Card.Content>
                <Card.Content extra>
                  <Skeleton count={1} />
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  } else {
    return (
      <Grid columns={3} divided>
        <Grid.Row className="page-title">
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}
          <Transition.Group duration={200}>
            {post &&
              post.map((post, index) => (
                <Grid.Column key={index} style={{ marginBottom: "20px" }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        </Grid.Row>
      </Grid>
    );
  }
};

export default Home;
