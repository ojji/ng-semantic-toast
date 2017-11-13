<p align="center">
  <a href="https://github.com/ojji/ng-semantic-toast">
    <img height="240" width="240" src="https://raw.githubusercontent.com/ojji/ng-semantic-toast/master/toast-logo-300.png">
  </a>
</p>

<!-- Name -->
<h1 align="center">
  <a href="https://github.com/ojji/ng-semantic-toast">Angular + Semantic UI Toast module</a>
</h1>

Angular toast notification module built with Semantic UI.

## Dependencies

* npm > 5.5.1 to install from GitHub.
* ng2-semantic-ui > 0.9.6
* angular > 4.3.1

## Installation

* To install this library, you need to install from GitHub.

``$ npm install git+https://github.com/ojji/ng-semantic-toast.git --save``

* You need to include the Semantic UI stylesheet in your ``index.html`` file.

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.13/semantic.min.css">
```

* Import the toast module in your application module, and add the toast service to the providers.

```typescript
import { SuiToastModule } from 'ng-semantic-toast';

@NgModule({
    declarations: [AppComponent, ...],
    imports: [SuiToastModule],
    providers: [SuiToastService],
    bootstrap: [AppComponent]
})
export class AppModule {}
```

Now you are good to go!

## Usage

To add a new toast, you have to call the toast service's ``addToast(toast: SuiToast)`` method.

There are 2 types of toasts supported at the moment - both extending the ```SuiToast``` abstract class:

* ```SuiMessageToast``` - these are simple toasts based on the Semantic UI message component, capable to display simple notifications to the user
* ```SuiCustomTemplateToast<T>``` - these are customisable toasts which need custom templates supplied and a data context to operate on, allowing to create more complex notifications to display to the user

Both classes are customizable with properties in the ```IToastOptions``` interface.
