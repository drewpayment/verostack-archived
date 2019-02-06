import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User, IUserDetail, IAgent, ILocalStorage} from '../models/index';
import {Observable, ReplaySubject, Subject, BehaviorSubject} from 'rxjs';

import {SessionService} from '../session.service';

import * as _ from 'lodash';
import * as moment from 'moment';
import {environment} from '@env/environment';
import {IUserDetailInfo} from '@app/models/user-detail-info.model';
import {IRole} from '@app/models/role.model';
import { catchError } from 'rxjs/operators';

interface DataStore {
    user: User;
    users: User[];
    detail: IUserDetail;
    agents: IAgent[];
}

@Injectable()
export class UserService {
    private apiUrl: string = environment.apiUrl;
    private api = environment.apiUrl + 'api/';

    dataStore: DataStore = {
        user: null,
        users: null,
        detail: null,
        agents: null
    };

    user: Observable<User>;
    user$ = new BehaviorSubject<User>(null);
    users: Observable<User[]>;
    private users$: Subject<User[]> = new ReplaySubject<User[]>(1);
    agents: Observable<IAgent[]>;
    private agents$: Subject<IAgent[]> = new ReplaySubject<IAgent[]>(1);
    userDetail: Observable<IUserDetail>;
    userDetail$: Subject<IUserDetail> = new ReplaySubject<IUserDetail>(1);

    constructor(private http: HttpClient, private session: SessionService) {
        this.user = this.user$.asObservable();
        this.users = this.users$.asObservable();
        this.userDetail = this.userDetail$.asObservable();
        this.agents = this.agents$.asObservable();

        this.session.userItem.subscribe((user: User) => {
            const detail = user == null ? null : user.detail;
            this.user$.next(user);
            this.dataStore.user = user;
            this.dataStore.detail = detail;
            this.userDetail$.next(detail);
        });
    }

    ngOnInit() {
        this.session.getItem('user');
    }

    setUser(user: User): void {
        this.user$.next(user);
    }

    reloadUserPromise(): Promise<void> {
        return new Promise<void>(resolve => {
            if (this.dataStore.user == null) {
                this.session.getItem('user');
            }
            this.user$.next(this.dataStore.user);
        });
    }

    reloadUsers(): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            this.users$.next(this.dataStore.users);
            return true;
        });
    }

    /**
     * Get's session user's detail.
     */
    getUserDetail(): Promise<IUserDetail> {
        return new Promise<IUserDetail>((resolve, reject) => {
            if (this.dataStore.detail == null) reject();
            this.userDetail$.next(this.dataStore.detail);
            resolve(this.dataStore.detail);
        });
    }

    reloadUserDetail(): void {
        this.userDetail$.next(this.dataStore.detail);
    }

    reloadUser(): void {
        if (this.dataStore.user == null) {
            this.user$.next(this.session.dataStore.user);
        } else {
            this.user$.next(this.dataStore.user);
        }
    }

    /**
     * Gets a user's detail entity.
     *
     * @param userId
     */
    getUserDetailById(userId: number): Promise<IUserDetail> {
        return this.http
            .get(this.apiUrl + 'api/users/' + userId + '/detail')
            .toPromise()
            .then((detail: IUserDetail) => {
                return detail;
            });
    }

    loadUsersByActiveState(activeOnly: boolean = true): void {
        this.http.get(this.apiUrl + 'api/users/all/statuses/' + activeOnly).subscribe((data: User[]) => {
            this.dataStore.users = data;
            this.users$.next(this.dataStore.users);
        });
    }

    /**
     *
     *
     * @param activeOnly
     */
    loadAgents(activeOnly: boolean = true): void {
        this.http.get(this.apiUrl + 'api/agents').subscribe((data: IAgent[]) => {
            this.dataStore.agents = data;
            this.agents$.next(this.dataStore.agents);
        });
    }

    /**
     * Get all agents, return a promise asynchronously.
     */
    refreshAgents(): Promise<IAgent[]> {
        return new Promise<IAgent[]>(resolve => {
            if (this.dataStore.agents == null) this.loadAgents(true);
            resolve(this.dataStore.agents);
        });
    }

    getAgentByUserId(userId: number): Promise<IAgent> {
        if (this.dataStore.agents == null) this.loadAgents(true);
        return new Promise(resolve => {
            let agent = _.filter(this.dataStore.agents, (a: IAgent) => {
                return a.userId == userId;
            }) as IAgent;
            resolve(agent);
        });
    }

    getAgentsByManagerId(managerId: number): Promise<IAgent[]> {
        if (this.dataStore.agents == null) {
            return new Promise(resolve => {
                this.http.get(this.apiUrl + 'api/agents').subscribe((agents: IAgent[]) => {
                    this.dataStore.agents = agents;
                    this.agents$.next(agents);
                    agents = _.filter(agents, (a: IAgent) => {
                        return a.managerId == managerId;
                    });
                    resolve(agents);
                });
            });
        } else {
            return new Promise(resolve => {
                let agents: IAgent[] = _.filter(this.dataStore.agents, (agent: IAgent) => {
                    return agent.managerId == managerId;
                });
                resolve(agents);
            });
        }
    }

    /**
     * Get a user entity by user id for use, this is not to be used for session user info.
     *
     * @param userId
     */
    getUser(userId: number): Promise<User> {
        return this.http
            .get(this.apiUrl + 'api/users/' + userId)
            .toPromise()
            .then((user: User) => {
                return user;
            });
    }

    /**
     * Get a user by username... ONLY use if the user is authenticated. This route should
     * be covered with middleware on the server.
     *
     * @param username
     */
    loadUser(username: string): void {
        this.http.get(this.apiUrl + 'api/users/' + username + '/session').subscribe((data: User) => {
            this.dataStore.detail = data.detail;
            this.userDetail$.next(data.detail);

            this.dataStore.user = data;
            this.session.setUser(this.dataStore.user);
            this.user$.next(this.dataStore.user);
            this.setLocalStorageUser(this.dataStore.user);
        });
    }

    storeNgUser(user: User): void {
        this.dataStore.detail = user.detail;
        this.userDetail$.next(user.detail);

        this.dataStore.user = user;
        this.session.setUser(this.dataStore.user);
        this.user$.next(this.dataStore.user);
        this.setLocalStorageUser(this.dataStore.user);
    }

    updateUser(user: User, detail: IUserDetail): void {
        this.http.post(this.apiUrl + 'api/users/' + user.id, {user: user, detail: detail}).subscribe((data: any) => {
            if (data.user) {
                this.dataStore.user = data.user;
                this.session.setUser(this.dataStore.user);
            } else {
                this.dataStore.user = data;
            }

            if (data.detail != null) {
                this.dataStore.detail = data.detail;
                this.userDetail$.next(this.dataStore.detail);
            }

            this.user$.next(this.dataStore.user);
            this.setLocalStorageUser(this.dataStore.user);
        });
    }

    updateUserEntity(user: User): Promise<User> {
        return this.http
            .post(this.apiUrl + 'api/users/' + user.id, user)
            .toPromise()
            .then((user: User) => {
                return user;
            });
    }

    saveNewUserAgentEntity(
        user: User,
        agent: IAgent,
        detail: IUserDetail,
        clientId: number,
        role: number
    ): Observable<boolean> {
        let dto = {user: user, agent: agent, detail: detail, role: role};
        return this.http.post<boolean>(`${this.apiUrl}api/users/clients/${clientId}/new-user-agent`, dto);
    }

    /**
     * @description This will allow us to the update the current signed in user's cached session information
     * without having to persist anything back to the server. This should only be used if the updated information
     * on the user's session is non-related to the user's table (e.g. The current client selected has options changed
     * and the logged in user's object needs to know about those changes).
     *
     * @param user
     * @return void
     */
    cacheUser(user: User): void {
        this.dataStore.user = user;
        this.user$.next(this.dataStore.user);
        this.setLocalStorageUser(this.dataStore.user);
    }

    loadUserDetail(userId: number = null): void {
        userId = userId || this.dataStore.user.id;
        this.http.get(this.apiUrl + 'api/users/' + userId + '/detail').subscribe((data: IUserDetail) => {
            if (data == null) return;
            this.dataStore.detail = data;
            this.userDetail$.next(this.dataStore.detail);
        });
    }

    /**
     * For use to update a user's detail information and return promise.
     *
     * @param detail
     */
    saveDetailEntity(detail: IUserDetail): Promise<IUserDetail> {
        let executionUrl =
            detail.userDetailId != null
                ? this.apiUrl + 'api/users/' + detail.userId + '/details/' + detail.userDetailId
                : this.apiUrl + 'api/users/' + detail.userId + '/details';
        return this.http
            .post(executionUrl, detail)
            .toPromise()
            .then((detail: IUserDetail) => {
                return detail;
            });
    }

    /**
     * Update user detail sale info
     *
     * @param detail
     */
    updateDetailSaleInfo(detail: IUserDetail): Promise<IUserDetail> {
        let url = this.api + 'users/' + detail.userId + '/details/' + detail.userDetailId + '/sale-info';
        return this.http
            .post(url, detail)
            .toPromise()
            .then((detail: IUserDetail) => {
                return detail;
            });
    }

    updateDetailAgentInfo(detail: IUserDetailInfo): Promise<IUserDetailInfo> {
        let url = this.api + 'users/' + detail.userId + '/details/' + detail.userDetailId + '/agent-info';
        return this.http
            .post(url, detail)
            .toPromise()
            .then((detail: IUserDetailInfo) => {
                return detail;
            });
    }

    /**
     * Only for use on session user, this will update session user details.
     *
     * @param detail
     */
    updateDetail(detail: IUserDetail): void {
        this.http
            .post(this.apiUrl + 'api/users/' + detail.userId + '/details/' + detail.userDetailId, detail)
            .subscribe((data: IUserDetail) => {
                this.dataStore.detail = data;
                this.userDetail$.next(this.dataStore.detail);
            });
    }

    saveUserRoleEntity(role:IRole):Observable<IRole> {
        const url = `${this.apiUrl}api/users/${role.userId}/roles`;
        return this.http.post<IRole>(url, role);
    }

    logout(): void {
        this.dataStore.user = null;
        this.user$.next(null);
        this.dataStore.detail = null;
        this.userDetail$.next(null);
    }

    /**
     * This sets the session user. It will save/overwrite any existing user information for the logged in
     * user on the session cookie.
     *
     * @param user
     */
    private setLocalStorageUser(user: User): void {
        let data: ILocalStorage<User> = <ILocalStorage<User>>{
            expires: moment().valueOf() + 1000 * (60 * 24 * 3),
            data: user
        };
        this.session.setItem('user', data);
    }
}
