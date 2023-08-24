import process from 'process';

process.report.reportOnFatalError = true;
process.report.reportOnUncaughtException = true;
process.report.reportOnSignal = true;
process.report.filename  = '14_report.json';

function sampleError(){
  throw new Error('Ups');
}

sampleError();