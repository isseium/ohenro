/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 * WARNING: This is generated code. Do not modify. Your changes *will* be lost.
 */

#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"

@implementation ApplicationDefaults

+ (NSMutableDictionary*) copyDefaults
{
	NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];
	
	[_property setObject:[TiUtils stringValue:@"GzmVPzQY2dCeb0prYODLxx1ZGY4Bu9zD"] forKey:@"acs-oauth-secret-production"];
	[_property setObject:[TiUtils stringValue:@"Euvd3YG54A3OoYu0lhTxQeHxkx68VmFT"] forKey:@"acs-oauth-key-production"];
	[_property setObject:[TiUtils stringValue:@"2qfmC68ltGDi3XQbjFUtzNg5FaJJP8E7"] forKey:@"acs-api-key-production"];
	[_property setObject:[TiUtils stringValue:@"1yoZwPX9bWfOucE54QASiqXbvcwCDkde"] forKey:@"acs-oauth-secret-development"];
	[_property setObject:[TiUtils stringValue:@"tdK1SCCcZ4Y1hkCFhdcwo4LPKfW0aDpm"] forKey:@"acs-oauth-key-development"];
	[_property setObject:[TiUtils stringValue:@"EFzOS8c28vncoCHuo7gfuMcaMjAJxMQo"] forKey:@"acs-api-key-development"];
	[_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];
	return _property;
}

@end