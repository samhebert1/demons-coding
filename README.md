# Demonscoding

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.1.

## Update 04/15/2019

 - [x] basic integration with the Angular Material design library 
  - [ ] toolbar
    - [ ] needs to have dynamic views based on auth state
 - [ ] implement the NSU Logo in toolbar and where appropriate throughout the site
 - [ ] **Everything needs to be coded with the mobile view primarily**
    - [ ] mat-toolbar looks like it needs an additional view constraint. I will use fx


1. ```
     npm i --save @angular/material @angular/cdk @angular/animations
    ```
    * This adds the required dependencies via NPM.

2. ```
    ng add @angular/material
    ```
    * This is a schematic command built into Angular CLI. 
    * This command automates much of the design library integration process.
        * In the CLI prompts, I chose the purple/green prebuilt theme for now. I said yes to all CLI prompts.

3. in the global styles file, **styles.css**, I imported the prebuilt theme:
    ```javascript
    /* You can add global styles to this file, and also import other style files */
    @import '@angular/material/prebuilt-themes/deeppurple-amber.css';
    html, body { height: 100%; }
    body { margin: 0; font-family: Roboto, "Helvetica Neue", sans-serif; }
    ```

4. In **app.module.ts**, I imported the Angular Material Toolbar API reference:
     ```javascript
      import {MatToolbarModule} from '@angular/material/toolbar';
     ```
     And also add the the module to the imports list below the imports:
     ```javascript
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        CoreModule,
        BrowserAnimationsModule,
        MatToolbarModule
    ],
    providers: [],
    bootstrap: [AppComponent]
    })
     ```

5. After that, I began to implement the toolbar in the global HTML viewport **app.component.html**:
    ```HTML
    <mat-toolbar color="primary" class="main-toolbar">
        <mat-toolbar-row>
        <span> {{title}} </span>
        <span class="fill-space"> </span>
        <span>
            <div *ngIf="fAuth.user | async; then authenticated; else guest">
            <!-- replaced by template -->
            </div>
        </span>
        </mat-toolbar-row>

    </mat-toolbar>
    ```
 * I inserted the existing logic/html that displays the toolbar buttons inside the new mat-toolbar code
 * I created an empty *span* class named *fill-space*, which I will uitilize in the corresponding css next.

6. I tweaked the CSS for the new elements of the HTML in **app.component.css**:
    ```css

    ```

7. So, now the toolbar functionality and design is implemented in the desktop view, but the mobile view looks like a travesty. To fix that we are going to use the *flex-layout* library. The first step is import from the command prompt:
    ```
        npm i -s @angular/flex-layout 
    ```
    Next step: import FlexLayout module in **app.module.ts**:
    ```javascript
    import { FlexLayoutModule } from '@angular/flex-layout';
    ```
    * ***Don't forget to also add FlexLayoutModule to the list of imports!***
    
