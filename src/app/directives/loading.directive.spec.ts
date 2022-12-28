import { TemplateRef } from '@angular/core';
import { LoadingDirective } from './loading.directive';

describe('LoadingDirective', () => {
  it('should create an instance', () => {
    const directive = new LoadingDirective({} as any, {} as any, {} as any);
    expect(directive).toBeTruthy();
  });
});
