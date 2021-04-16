import styled from "@emotion/styled";
import { useStoreRehydrated } from "easy-peasy";
import { useEffect } from "react";
import { Input } from "./components/Input";
import { Results } from "./components/Results";
import { useStoreActions } from "./store/hooks";
import { parseQueryParams } from "./utils/query-params";

const Container = styled.div`
  /* background: papayawhip; */
  margin: 0 auto;
  max-width: 1140px;
  height: 100vh;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
`;

const Hr = styled.hr`
  border-top: 1px solid var(--border);
  width: 100%;
`;

const App: React.FC = () => {
  const actions = useStoreActions((actions) => actions);

  useEffect(() => {
    const parsedQueryParams = parseQueryParams();
    if (parsedQueryParams.q) {
      actions.set(parsedQueryParams.q);
    }
  }, []);

  const isRehydrated = useStoreRehydrated();
  return (
    <>
      <Container>
        {isRehydrated ? (
          <Row>
            <Column>
              <Input />
            </Column>
            <Hr />
            <Column>
              <Results />
            </Column>
          </Row>
        ) : (
          <div>Loading...</div>
        )}
      </Container>
    </>
  );
};

export default App;
