import { Gulpclass, Task } from 'gulpclass/Decorators';

const gulp = require('gulp');
const del = require('del');

@Gulpclass()
export class GulpFile {

  @Task()
  clean(cb: Function) {
    return del(['./build/**'], cb);
  }
}