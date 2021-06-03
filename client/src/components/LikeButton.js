import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";

const LikeButton = ({ user, post: { id, likeCount, likes } }) => {
  const [liked, setLiked] = useState(false);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const likeButton = user ? (
    liked ? (
      <Button className="likeButton">
        <Icon name="heart" style={{ color: "red", fontSize: "16px" }} />
        Like
      </Button>
    ) : (
      <Button className="likeButton">
        <Icon name="heart outline" style={{ color: "red", fontSize: "16px" }} />
        Like
      </Button>
    )
  ) : (
    <Button basic as={Link} to="/login" className="likeButton">
      <Icon name="heart outline" style={{ color: "red", fontSize: "16px" }} />
      Like
    </Button>
  );

  return (
    <div>
      <Button as="div" labelPosition="right" onClick={likePost} primary>
        {likeButton}
        <Label basic color="teal" pointing="left" id="labelLike">
          {likeCount}
        </Label>
      </Button>
    </div>
  );
};

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
