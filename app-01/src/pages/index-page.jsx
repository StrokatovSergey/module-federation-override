import Markdown from '../Markdown';
import Page from '../Page';
import React from 'react';
import Welcome from '../docs/Welcome.md';

const IndexPage = () => (
  <Page title="Module Federation Demo">
    <alert-box id="info" content="Alert from LitElement"></alert-box>
    <Markdown>{Welcome}</Markdown>
    <action-button foo="Lit Element Action"></action-button>
  </Page>
);

export default IndexPage;
