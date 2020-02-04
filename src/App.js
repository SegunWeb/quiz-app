import React from 'react';
import Layout from "./hoc/Layout/Layout";
import { Menu } from 'semantic-ui-react'
import Quiz from "./containers/Quiz/Quiz";

function App() {
  return (
    <div>
        <Menu>
            <Menu.Item>
                Editorials
            </Menu.Item>
            <Menu.Item>
                Reviews
            </Menu.Item>
        </Menu>

        <Layout>
            <h2>layout</h2>
            <Quiz/>
        </Layout>
    </div>
  );
}

export default App;
