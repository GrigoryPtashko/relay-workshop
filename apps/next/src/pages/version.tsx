import type { NextPage } from 'next';
import { graphql, usePreloadedQuery } from 'react-relay';
import { getPreloadedQuery } from '../relay/getPreloadedQuery';
import { Flex } from 'rebass';

const versionQuery = graphql`
  query versionQuery @preloadable {
    version   
  }
`;

const Version: NextPage = (props) => {
  const query = usePreloadedQuery(
    versionQuery,
    props.queryRefs.versionQuery,
  );

  return (
    <Flex flexDirection='column'>
      <span>Workshop</span>
      <span>Version: {query.version}</span>
    </Flex>
  );
};

export default Version;

export async function getServerSideProps(ctx) {
  return {
    props: {
      preloadedQueries: {
        versionQuery: await getPreloadedQuery(versionQuery, {}, ctx),
      },
    },
  };
}
