import React, { useState, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import styled, { css } from 'styled-components/native';
import * as MediaLibrary from 'expo-media-library';


export default () => {
  const windowWidth = useWindowDimensions().width;
  const imageWidth = Math.round(windowWidth / 3) - 2;
  
  const [ isLoading, setLoading ] = useState(true);
  const [ hasPermission, setHasPermission ] = useState(false);
  const [ assets, setAssets ] = useState({
    assets: [],
    endCursor: null,
    hasNextPage: false,
    totalCount: 0,
  });

  useEffect(() => {
    const a = async () => {
      const rspPermissions = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(rspPermissions.granted);
      setLoading(false);
      const rspAssets = await MediaLibrary.getAssetsAsync({
        first: 20,
      })
      setAssets(rspAssets);
    }
    a();
  }, []);

  const loadAssets = async () => {
    
    
  }

  if () return null;

  return (<Container>
    {assets.assets.map(asset => <ImageContainer key={asset.id} size={imageWidth}>
      <Image
        source={{uri: asset.uri}}
      />
    </ImageContainer>)}
  </Container>);
}

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ImageContainer = styled.TouchableOpacity`
  margin-bottom: 2px;
  ${({size}) => css`
    width: ${size}px;
    height: ${size}px;
  `}
`;

const Image = styled.Image`
  flex: 1;
`;