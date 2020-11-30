import React, { useContext, useState } from 'react';
import styled, { css } from 'styled-components/native';
import { createFragmentContainer, graphql, ReactRelayContext } from 'react-relay';

import ChangeVoteMutation from '../../mutations/Vote/ChangeVoteMutation';
import HeartIcon from '../../components/Icons/Heart';
import HeartFilledIcon from '../../components/Icons/HeartFilled';


const VotingBtn = ({vote}) => {
  const { environment } = useContext(ReactRelayContext);
  const [ isLoading, setLoading ] = useState(false);
  const direction = vote.myVote===1 ? 0 : 1;
  const {
    objectID,
    objectKind,
  } = vote;
  const Icon = vote.myVote === 1 ? HeartFilledIcon : HeartIcon;

  const handleLike = ()=>{
    setLoading(true)
    console.log(isLoading)
    isLoading===false && ChangeVoteMutation(environment, objectKind, objectID, direction, (response, errors) => {
      if (errors) {
        console.log(errors.message);
        return;
      }
      console.log(isLoading,"2")
      setLoading(false)
  });
}

  return (<Container accessibilityState={{disabled:isLoading}}>
      <LikeBtn onPress={handleLike} activeOpacity={0.5} isLoading={isLoading}>
        <Icon width={25} height={25}/>
        <Text>{vote.votes}</Text>
      </LikeBtn>
    </Container>
  );
}


export default createFragmentContainer(VotingBtn, {
  vote: graphql`
    fragment VotingBtn_vote on Vote {
      id
      votes
      myVote
      objectKind
      objectID
    }
  `,
});

const Container = styled.View`
  border-top-color: ${({theme})=>theme.colors.border};
  border-top-width:1px;
  margin:0px 8px;
`;

const LikeBtn = styled.TouchableOpacity`
  width:50px;
  height:25px;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:row;
  margin:10px -10px;
  ${({isLoading}) => isLoading=false && css`
    opacity:0.5;
  `}
  position:relative;
`;

const Text = styled.Text`
  color:white;
  font-size = 25px;
  margin-left:10px;
  position:absolute;
  left:35px;
`;
