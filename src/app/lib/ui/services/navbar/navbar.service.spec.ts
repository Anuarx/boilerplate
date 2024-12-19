import { TestBed } from "@angular/core/testing"
import { NavbarService } from "./navbar.service"

describe('NavbarService', () => {
  let service: NavbarService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NavbarService,
      ]
    })

    service = TestBed.inject(NavbarService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should set componentTitle', () => {
    const data = {
      icon: 'icon',
      steps: ['step1', 'step2']
    }
    service.componentTitle = data
    expect(service.componentTitle).toEqual(data)
  })

  it('should get componentTitleObserver', () => {
    const data = {
      icon: 'icon',
      steps: ['step1', 'step2']
    }
    service.componentTitle = data
    service.componentTitleObserver.subscribe((res) => {
      expect(res).toEqual(data)
    })
  })
})
