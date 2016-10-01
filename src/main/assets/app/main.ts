import './rxjs-extensions';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PzAppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(PzAppModule);
