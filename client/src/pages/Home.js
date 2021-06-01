import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Grid, Card } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import Skeleton from "react-loading-skeleton";

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      comments {
        id
        createdAt
        username
        body
      }
      commentCount
      likes {
        id
        createdAt
        username
      }
      likeCount
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

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
          {data.getPosts &&
            data.getPosts.map((post, index) => (
              <Grid.Column key={index} style={{ marginBottom: "20px" }}>
                <PostCard post={post} />
              </Grid.Column>
            ))}
        </Grid.Row>
      </Grid>
    );
  }
};

export default Home;
