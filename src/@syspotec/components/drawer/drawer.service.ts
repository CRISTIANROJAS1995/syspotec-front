import { Injectable } from '@angular/core';
import { SyspotecDrawerComponent } from '@syspotec/components/drawer/drawer.component';

@Injectable({
    providedIn: 'root'
})
export class SyspotecDrawerService
{
    private _componentRegistry: Map<string, SyspotecDrawerComponent> = new Map<string, SyspotecDrawerComponent>();

    /**
     * Constructor
     */
    constructor()
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register drawer component
     *
     * @param name
     * @param component
     */
    registerComponent(name: string, component: SyspotecDrawerComponent): void
    {
        this._componentRegistry.set(name, component);
    }

    /**
     * Deregister drawer component
     *
     * @param name
     */
    deregisterComponent(name: string): void
    {
        this._componentRegistry.delete(name);
    }

    /**
     * Get drawer component from the registry
     *
     * @param name
     */
    getComponent(name: string): SyspotecDrawerComponent | undefined
    {
        return this._componentRegistry.get(name);
    }
}
