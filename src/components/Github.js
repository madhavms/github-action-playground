import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width:100vw;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Text = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const Link = styled.a`
  color: #0366d6;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const GithubActionsComponent = () => {
  return (
    <Container>
      <Title>GitHub Action Playground</Title>
      <Text>GitHub Actions is a powerful platform for CI/CD workflows.</Text>
      <Text>
        Learn more about GitHub Actions on the{' '}
        <Link href="https://github.com/features/actions">GitHub website</Link>.
      </Text>
      <Text>
        Check out some examples of GitHub Actions workflows on the{' '}
        <Link href="https://github.com/actions/starter-workflows">GitHub Actions starter workflows repository</Link>.
      </Text>
    </Container>
  );
};

export default GithubActionsComponent;
