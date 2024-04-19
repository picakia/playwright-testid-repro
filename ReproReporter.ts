import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from '@playwright/test/reporter';

import fs from 'fs';

const packageJSON = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

class ReproReporter implements Reporter {
  onBegin(config: FullConfig, suite: Suite) {
    console.log(`Starting the run with ${suite.allTests().length} tests\n`);
  }

  onTestBegin(test: TestCase, result: TestResult) {
    //console.log(`Starting test ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    console.log(
      //@ts-ignore
      `[REPRO REPORTER] Finished test ${test.title} (${test._projectId}): ${result.status}\n`
    );

    console.log('[REPRO REPORTER] test.id from onTestEnd: ' + test.id + '\n');
    console.log(
      '[REPRO REPORTER] Playwright version: ' +
        packageJSON.devDependencies['@playwright/test'] +
        '\n'
    );
  }

  onEnd(result: FullResult) {
    console.log(`Finished the run: ${result.status}`);
  }
}

export default ReproReporter;
