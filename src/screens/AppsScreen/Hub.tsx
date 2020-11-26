import React, { useContext } from 'react';
import { Button } from 'react-native';
import { ReactRelayContext, QueryRenderer, graphql } from 'react-relay';
import styled, { css } from 'styled-components/native';
import queryRenderWrapper from '../../components/queryRenderWrapper';
import AppsCard from './AppsCard';


const __query = graphql`
  query HubAppsQuery {
    soulpay {
      my {
        id
        balance
        currency
      }
    }
  }
`;


const Hub = ({ navigate, soulpay }) => {
  const openApp = (appID) => {
    navigate('Application', { appID })
  }

  const soulpayWallet = soulpay.my.length > 0 ? soulpay.my[0] : null;
  return (<Container>

    <AppsCard
      iconSource={require("../../assets/soulpayIcon.png")}
      title="pay"
      subtitleComponent={soulpayWallet && <PaySubtitle>
        <PaySubtitleAmount>{soulpayWallet.balance/100}</PaySubtitleAmount>
        <PaySubtitleCurrency>{soulpayWallet.currency}</PaySubtitleCurrency>
      </PaySubtitle>}
      onPress={() => openApp("1c6787e1-d9d6-4478-89e5-7590a9aa4b23")}
    />
  </Container>);
}

export default ({navigation: { navigate }}) => {
  const { environment } = useContext(ReactRelayContext);

  return (<QueryRenderer
    environment={environment}
    query={__query}
    render={queryRenderWrapper(({soulpay}) => <Hub navigate={navigate} soulpay={soulpay} />)}
  />);
}

const Container = styled.ScrollView``

const PaySubtitle = styled.View`
  flex-direction: row;
`;

const PaySubtitleAmount = styled.Text`
  ${({theme}) => css`
    color: ${theme.colors.text};
  `}
  font-weight: 900;
  font-size: 20px;
`;

const PaySubtitleCurrency = styled.Text`
  ${({theme}) => css`
    color: ${theme.colors.text};
  `}
  font-size: 20px;
`;
