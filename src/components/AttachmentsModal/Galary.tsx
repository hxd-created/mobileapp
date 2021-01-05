import React, { useState, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import styled, { css } from 'styled-components/native';
import * as MediaLibrary from 'expo-media-library';


export default ({setActionBtn, onDone}) => {
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
  const [ selectedAssetsIDs, setSelectedAssetsIDs ] = useState({});

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

  const toggleSelectedAsset = (asset) => {
    const newVal = {...selectedAssetsIDs, [asset.id]: !!selectedAssetsIDs[asset.id] ? false : asset};
    setSelectedAssetsIDs(newVal);
    const selectedAssetsCount = Object.keys(newVal)
      .filter(key => newVal[key])
      .length;

    if (selectedAssetsCount == 0) {
      setActionBtn(null);
      return;
    }

    const handleSubmit = () => {
      const selectedAssets = Object.keys(newVal)
        .filter(id => newVal[id] !== false)
        .map(id => newVal[id]);
  
      onDone(selectedAssets);
      setSelectedAssetsIDs({});
      setActionBtn(null);
    }

    setActionBtn({
      titleKey: "add",
      counterLabel: selectedAssetsCount,
      onPress: handleSubmit,
    });
  }

  if (isLoading) return null;
  
  return (<Container>
    {assets.assets.map(asset => <ImageContainer key={asset.id} size={imageWidth} onPress={() => toggleSelectedAsset(asset)}>
      <Select selected={!!selectedAssetsIDs[asset.id]}/>
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

  z-index: 2;
`;

const Select = styled.View`
  position: absolute;
  z-index: 3;
  right: 6px;
  top: 6px;

  width: 23px;
  height: 23px;
  border-width: 3px;
  border-color: orange;
  border-radius: 26px;
  ${({selected}) => selected ? css`
    background-color: orange;
  ` : css`
    background-color: black;
  `}
`;