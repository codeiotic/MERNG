import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import moment from "moment";
import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import { Button, Card, Grid, Image, Icon, Label } from "semantic-ui-react";
import DeleteButton from "../components/DeleteButton";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";

const SinglePost = (props) => {
  console.log(props);
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);

  function deletePostCallback() {
    props.history.push("/");
  }

  const { data, loading, error } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  // eslint-disable-next-line
  let postMarkUp;

  if (!data) {
    postMarkUp = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Skeleton circle={true} count={4} />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>
                  <Skeleton count={1} />
                </Card.Header>
                <Card.Meta>
                  <Skeleton count={1} />
                </Card.Meta>
                <Card.Description>
                  <Skeleton count={3} />
                </Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <Button as="div">
                  <Skeleton count={1} />
                </Button>
                <Button as="div">
                  <Skeleton count={1} />
                </Button>
                <Button as="div" floated="right">
                  <Skeleton count={1} />
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = data.getPost;

    postMarkUp = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log("Comment on Post!")}
                >
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkUp;
};

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;
