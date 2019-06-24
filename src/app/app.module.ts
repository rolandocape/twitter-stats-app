import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {BrowserModule} from '@angular/platform-browser';
import {PubNubAngular} from 'pubnub-angular2';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store';

import {appReducers} from './store/reducers/app.reducers';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {TweetEffects} from './store/effects/tweet.effects';
import {AppComponent} from './app.component';
import {TwitterService} from './services/twitter.service';
import {TwitterStatsComponent} from './containers/twitter-stats/twitter-stats.component';
import {StatsBoardComponent} from './components/stats-board/stats-board.component';
import {TweetComponent} from './containers/tweet/tweet.component';
import {TweetDetailsComponent} from './components/tweet-details/tweet-details.component';

@NgModule({
  declarations: [
    AppComponent,
    TwitterStatsComponent,
    StatsBoardComponent,
    TweetComponent,
    TweetDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([TweetEffects]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AppRoutingModule,
  ],
  providers: [PubNubAngular, TwitterService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
