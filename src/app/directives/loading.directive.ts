import { ComponentFactoryResolver, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { LoadingComponent } from '../template-components/loading/loading.component';

@Directive({
  selector: '[appLoading]'
})
export class LoadingDirective {

  @Input()
  public set appLoadingPrefix(prefix: string) {
    this._prefix = prefix;
  }

  @Input()
  public set appLoading(loading: boolean) {
    this.viewContainer.clear();

    if (loading) {
      const componentRef = this.viewContainer.createComponent<LoadingComponent>(this.componentFactoryResolver.resolveComponentFactory(LoadingComponent));

      componentRef.instance.prefix = this._prefix;
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private _prefix = '';

  constructor(private templateRef: TemplateRef<any>,
      private viewContainer: ViewContainerRef,
      private componentFactoryResolver: ComponentFactoryResolver) {
  }
}
