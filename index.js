const core = require('@actions/core');
const github = require('@actions/github');
const octokit = require('@octokit/request');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
  const payload2 = JSON.stringify(github, undefined, 2)
  console.log(`The event payload: ${payload2}`);
  console.log(`GITHUB_TOKEN: ${process.env.GITHUB_TOKEN}`);
  
  
  //const octokit = new Octokit();
  const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");

  // See https://developer.github.com/v3/issues/#create-an-issue
  //const { data } = await octokit.request("POST /repos/:owner/:repo/issues", {
  const { data } = octokit.request("POST /repos/:owner/:repo/issues", {
    owner,
    repo,
    title: "My test issue"
  });
  console.log("Issue created: %d", data.html_url);
} 
catch (error) 
{
  core.setFailed(error.message);
}
