import React from 'react';
import { Route } from 'react-router-dom';
import TermsConditionPage from "../views/TermsConditionPage";
import MissionPage from "../views/MissionPage";

export default [
    <Route path="/terms-condition" component={TermsConditionPage} exact key="terms-condition" />,
    <Route path={"/mission"} component={MissionPage} exact key="mission" />
];
