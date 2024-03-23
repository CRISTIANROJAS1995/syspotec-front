import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, firstValueFrom, takeUntil } from 'rxjs';
import { SyspotecMediaWatcherService } from '@syspotec/services/media-watcher';
import { SyspotecNavigationService, SyspotecVerticalNavigationComponent } from '@syspotec/components/navigation';
import { Navigation, defaultNavigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { UserModel } from 'app/core/models/user.dto';
import { UserModelCls } from 'app/core/models/user-model';
import { UserResponseDtoModel } from 'app/core/models/user/user-response-dto-model';

@Component({
    selector: 'classy-layout',
    templateUrl: './classy.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean = false;
    navigation: Navigation = new Navigation();
    userModel: UserResponseDtoModel = new UserResponseDtoModel();
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _navigationService: NavigationService,
        private _userService: UserService,
        private _syspotecMediaWatcherService: SyspotecMediaWatcherService,
        private _syspotecNavigationService: SyspotecNavigationService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.getDataUser();

        //default menú
        this.navigation.default = defaultNavigation;

        // Subscribe to media changes
        this._syspotecMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {

                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    /**
   * get data user
   */
    getDataUser(): void {

        // Sign in
        this._userService.getMyUser()
            .subscribe(
                (response: UserResponseDtoModel) => {
                    this.userModel = response;
                },
                (response) => {
                    this.userModel = new UserResponseDtoModel();
                }
            );
    }

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation = this._syspotecNavigationService.getComponent<SyspotecVerticalNavigationComponent>(name);

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
