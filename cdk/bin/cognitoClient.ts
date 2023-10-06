#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";

import { account, branch, region } from "#helpers/configuration.ts";
import CognitoClientStack from "#stacks/cognito/client.ts";

const app = new cdk.App();

new CognitoClientStack(app, `${branch}-cognito-client`, "dashboard", {
  env: { account, region },
});