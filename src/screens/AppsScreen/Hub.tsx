import React, { useContext } from 'react';
import { ReactRelayContext, QueryRenderer, graphql } from 'react-relay';
import styled, { css } from 'styled-components/native';
import queryRenderWrapper from '../../components/queryRenderWrapper';
import AppsCard from './AppsCard';
import { AppCardList, AppCardListItem } from './AppsCardList';


const __query = graphql`
  query HubAppsQuery {
    soulpay {
      my {
        id
        balance
        currency
      }
    }
    apps {
      my {
        id
        isEnabled
        title
        icon {
          id
          previewURL
        }
      }
    }
  }
`;


const games = [
  {"id":"a15f5185-928a-4df9-9e37-155a4639069e","title":"Virus","icon":{"previewURL":"https://res.cloudinary.com/dfuteltnk/image/upload/c_limit,w_300,h_300/f6fb3c65cad9a7aef59bd755dbd1376385e0e036d370f797c68c8859624eb6ee","id":"photo-15638"}},
  {"id":"d0dc634b-5db7-42ab-ad21-6747ffcf72a2","title":"2048","icon":{"previewURL":"https://res.cloudinary.com/dfuteltnk/image/upload/c_limit,w_300,h_300/b0a8e60cc19d6cd62000c7f4084e6976c58205626087fd7407b60893df221747","id":"photo-41978"}},
];

const Hub = ({ navigate, soulpay, myDevApps }) => {
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

    {myDevApps && myDevApps.length > 0 && <AppsCard
      title="My development apps"
      content={<AppCardList>
        {myDevApps.map(app => <AppCardListItem
          key={app.id}
          icon={app.icon}
          title={app.title}
          onPress={() => openApp(app.id)}
        />)}
      </AppCardList>}
    />}

    <AppsCard
      title="Games"
      content={<AppCardList>
        {games.map(app => <AppCardListItem
          key={app.id}
          icon={app.icon}
          title={app.title}
          onPress={() => openApp(app.id)}
        />)}
      </AppCardList>}
    />
  </Container>);
}

export default ({navigation: { navigate }}) => {
  const { environment } = useContext(ReactRelayContext);

  return (<QueryRenderer
    environment={environment}
    query={__query}
    render={queryRenderWrapper((rsp) => <Hub navigate={navigate} soulpay={rsp.soulpay} myDevApps={rsp.apps.my} />)}
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
