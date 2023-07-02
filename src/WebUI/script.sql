IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [AspNetRoles] (
    [Id] nvarchar(450) NOT NULL,
    [Name] nvarchar(256) NULL,
    [NormalizedName] nvarchar(256) NULL,
    [ConcurrencyStamp] nvarchar(max) NULL,
    CONSTRAINT [PK_AspNetRoles] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [AspNetUsers] (
    [Id] nvarchar(450) NOT NULL,
    [UserName] nvarchar(256) NULL,
    [NormalizedUserName] nvarchar(256) NULL,
    [Email] nvarchar(256) NULL,
    [NormalizedEmail] nvarchar(256) NULL,
    [EmailConfirmed] bit NOT NULL,
    [PasswordHash] nvarchar(max) NULL,
    [SecurityStamp] nvarchar(max) NULL,
    [ConcurrencyStamp] nvarchar(max) NULL,
    [PhoneNumber] nvarchar(max) NULL,
    [PhoneNumberConfirmed] bit NOT NULL,
    [TwoFactorEnabled] bit NOT NULL,
    [LockoutEnd] datetimeoffset NULL,
    [LockoutEnabled] bit NOT NULL,
    [AccessFailedCount] int NOT NULL,
    CONSTRAINT [PK_AspNetUsers] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [DeviceCodes] (
    [UserCode] nvarchar(200) NOT NULL,
    [DeviceCode] nvarchar(200) NOT NULL,
    [SubjectId] nvarchar(200) NULL,
    [SessionId] nvarchar(100) NULL,
    [ClientId] nvarchar(200) NOT NULL,
    [Description] nvarchar(200) NULL,
    [CreationTime] datetime2 NOT NULL,
    [Expiration] datetime2 NOT NULL,
    [Data] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_DeviceCodes] PRIMARY KEY ([UserCode])
);
GO

CREATE TABLE [Keys] (
    [Id] nvarchar(450) NOT NULL,
    [Version] int NOT NULL,
    [Created] datetime2 NOT NULL,
    [Use] nvarchar(450) NULL,
    [Algorithm] nvarchar(100) NOT NULL,
    [IsX509Certificate] bit NOT NULL,
    [DataProtected] bit NOT NULL,
    [Data] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Keys] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [PersistedGrants] (
    [Key] nvarchar(200) NOT NULL,
    [Type] nvarchar(50) NOT NULL,
    [SubjectId] nvarchar(200) NULL,
    [SessionId] nvarchar(100) NULL,
    [ClientId] nvarchar(200) NOT NULL,
    [Description] nvarchar(200) NULL,
    [CreationTime] datetime2 NOT NULL,
    [Expiration] datetime2 NULL,
    [ConsumedTime] datetime2 NULL,
    [Data] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_PersistedGrants] PRIMARY KEY ([Key])
);
GO

CREATE TABLE [TodoLists] (
    [Id] int NOT NULL IDENTITY,
    [Title] nvarchar(200) NOT NULL,
    [Colour_Code] nvarchar(max) NOT NULL,
    [Created] datetime2 NOT NULL,
    [CreatedBy] nvarchar(max) NULL,
    [LastModified] datetime2 NULL,
    [LastModifiedBy] nvarchar(max) NULL,
    CONSTRAINT [PK_TodoLists] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [AspNetRoleClaims] (
    [Id] int NOT NULL IDENTITY,
    [RoleId] nvarchar(450) NOT NULL,
    [ClaimType] nvarchar(max) NULL,
    [ClaimValue] nvarchar(max) NULL,
    CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [AspNetRoles] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [AspNetUserClaims] (
    [Id] int NOT NULL IDENTITY,
    [UserId] nvarchar(450) NOT NULL,
    [ClaimType] nvarchar(max) NULL,
    [ClaimValue] nvarchar(max) NULL,
    CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [AspNetUserLogins] (
    [LoginProvider] nvarchar(128) NOT NULL,
    [ProviderKey] nvarchar(128) NOT NULL,
    [ProviderDisplayName] nvarchar(max) NULL,
    [UserId] nvarchar(450) NOT NULL,
    CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY ([LoginProvider], [ProviderKey]),
    CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [AspNetUserRoles] (
    [UserId] nvarchar(450) NOT NULL,
    [RoleId] nvarchar(450) NOT NULL,
    CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY ([UserId], [RoleId]),
    CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [AspNetRoles] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [AspNetUserTokens] (
    [UserId] nvarchar(450) NOT NULL,
    [LoginProvider] nvarchar(128) NOT NULL,
    [Name] nvarchar(128) NOT NULL,
    [Value] nvarchar(max) NULL,
    CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY ([UserId], [LoginProvider], [Name]),
    CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [TodoItems] (
    [Id] int NOT NULL IDENTITY,
    [ListId] int NOT NULL,
    [Title] nvarchar(200) NOT NULL,
    [Note] nvarchar(max) NULL,
    [Priority] int NOT NULL,
    [Reminder] datetime2 NULL,
    [Done] bit NOT NULL,
    [Created] datetime2 NOT NULL,
    [CreatedBy] nvarchar(max) NULL,
    [LastModified] datetime2 NULL,
    [LastModifiedBy] nvarchar(max) NULL,
    CONSTRAINT [PK_TodoItems] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_TodoItems_TodoLists_ListId] FOREIGN KEY ([ListId]) REFERENCES [TodoLists] ([Id]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_AspNetRoleClaims_RoleId] ON [AspNetRoleClaims] ([RoleId]);
GO

CREATE UNIQUE INDEX [RoleNameIndex] ON [AspNetRoles] ([NormalizedName]) WHERE [NormalizedName] IS NOT NULL;
GO

CREATE INDEX [IX_AspNetUserClaims_UserId] ON [AspNetUserClaims] ([UserId]);
GO

CREATE INDEX [IX_AspNetUserLogins_UserId] ON [AspNetUserLogins] ([UserId]);
GO

CREATE INDEX [IX_AspNetUserRoles_RoleId] ON [AspNetUserRoles] ([RoleId]);
GO

CREATE INDEX [EmailIndex] ON [AspNetUsers] ([NormalizedEmail]);
GO

CREATE UNIQUE INDEX [UserNameIndex] ON [AspNetUsers] ([NormalizedUserName]) WHERE [NormalizedUserName] IS NOT NULL;
GO

CREATE UNIQUE INDEX [IX_DeviceCodes_DeviceCode] ON [DeviceCodes] ([DeviceCode]);
GO

CREATE INDEX [IX_DeviceCodes_Expiration] ON [DeviceCodes] ([Expiration]);
GO

CREATE INDEX [IX_Keys_Use] ON [Keys] ([Use]);
GO

CREATE INDEX [IX_PersistedGrants_ConsumedTime] ON [PersistedGrants] ([ConsumedTime]);
GO

CREATE INDEX [IX_PersistedGrants_Expiration] ON [PersistedGrants] ([Expiration]);
GO

CREATE INDEX [IX_PersistedGrants_SubjectId_ClientId_Type] ON [PersistedGrants] ([SubjectId], [ClientId], [Type]);
GO

CREATE INDEX [IX_PersistedGrants_SubjectId_SessionId_Type] ON [PersistedGrants] ([SubjectId], [SessionId], [Type]);
GO

CREATE INDEX [IX_TodoItems_ListId] ON [TodoItems] ([ListId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'00000000000000_InitialCreate', N'7.0.2');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

DROP TABLE [TodoItems];
GO

DROP TABLE [TodoLists];
GO

CREATE TABLE [Countries] (
    [Id] bigint NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [Flag] nvarchar(max) NOT NULL,
    [Code] nvarchar(max) NOT NULL,
    [Created] datetime2 NOT NULL,
    [CreatedBy] nvarchar(max) NULL,
    [LastModified] datetime2 NULL,
    [LastModifiedBy] nvarchar(max) NULL,
    CONSTRAINT [PK_Countries] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Diseases] (
    [Id] bigint NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [Zoonotic] bit NOT NULL,
    [Code] nvarchar(max) NOT NULL,
    [Classification] nvarchar(max) NOT NULL,
    [Created] datetime2 NOT NULL,
    [CreatedBy] nvarchar(max) NULL,
    [LastModified] datetime2 NULL,
    [LastModifiedBy] nvarchar(max) NULL,
    CONSTRAINT [PK_Diseases] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Institutions] (
    [Id] bigint NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [PublicSector] bit NOT NULL,
    [Type] nvarchar(max) NOT NULL,
    [Created] datetime2 NOT NULL,
    [CreatedBy] nvarchar(max) NULL,
    [LastModified] datetime2 NULL,
    [LastModifiedBy] nvarchar(max) NULL,
    CONSTRAINT [PK_Institutions] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [ParaProfessionals] (
    [Id] bigint NOT NULL IDENTITY,
    [PublicSector] bit NOT NULL,
    [Type] nvarchar(max) NOT NULL,
    [Created] datetime2 NOT NULL,
    [CreatedBy] nvarchar(max) NULL,
    [LastModified] datetime2 NULL,
    [LastModifiedBy] nvarchar(max) NULL,
    CONSTRAINT [PK_ParaProfessionals] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Species] (
    [Id] bigint NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [Created] datetime2 NOT NULL,
    [CreatedBy] nvarchar(max) NULL,
    [LastModified] datetime2 NULL,
    [LastModifiedBy] nvarchar(max) NULL,
    CONSTRAINT [PK_Species] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Regions] (
    [Id] bigint NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [Code] nvarchar(max) NOT NULL,
    [CountryId] bigint NOT NULL,
    [Created] datetime2 NOT NULL,
    [CreatedBy] nvarchar(max) NULL,
    [LastModified] datetime2 NULL,
    [LastModifiedBy] nvarchar(max) NULL,
    CONSTRAINT [PK_Regions] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Regions_Countries_CountryId] FOREIGN KEY ([CountryId]) REFERENCES [Countries] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [DiagnosticTests] (
    [Id] bigint NOT NULL IDENTITY,
    [TestName] nvarchar(max) NOT NULL,
    [NumberTested] int NOT NULL,
    [ReportId] bigint NOT NULL,
    [InstitutionId] bigint NULL,
    [ProfessionalId] bigint NOT NULL,
    [Created] datetime2 NOT NULL,
    [CreatedBy] nvarchar(max) NULL,
    [LastModified] datetime2 NULL,
    [LastModifiedBy] nvarchar(max) NULL,
    CONSTRAINT [PK_DiagnosticTests] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_DiagnosticTests_Institutions_InstitutionId] FOREIGN KEY ([InstitutionId]) REFERENCES [Institutions] ([Id]),
    CONSTRAINT [FK_DiagnosticTests_ParaProfessionals_ProfessionalId] FOREIGN KEY ([ProfessionalId]) REFERENCES [ParaProfessionals] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [Vaccinations] (
    [Id] bigint NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [NumberVaccinated] int NOT NULL,
    [ReportId] bigint NOT NULL,
    [DiseaseId] bigint NOT NULL,
    [InstitutionId] bigint NULL,
    [ProfessionalId] bigint NULL,
    [Created] datetime2 NOT NULL,
    [CreatedBy] nvarchar(max) NULL,
    [LastModified] datetime2 NULL,
    [LastModifiedBy] nvarchar(max) NULL,
    CONSTRAINT [PK_Vaccinations] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Vaccinations_Diseases_DiseaseId] FOREIGN KEY ([DiseaseId]) REFERENCES [Diseases] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_Vaccinations_Institutions_InstitutionId] FOREIGN KEY ([InstitutionId]) REFERENCES [Institutions] ([Id]),
    CONSTRAINT [FK_Vaccinations_ParaProfessionals_ProfessionalId] FOREIGN KEY ([ProfessionalId]) REFERENCES [ParaProfessionals] ([Id])
);
GO

CREATE TABLE [Occurrences] (
    [Id] bigint NOT NULL IDENTITY,
    [RegionId] bigint NOT NULL,
    [Created] datetime2 NOT NULL,
    [CreatedBy] nvarchar(max) NULL,
    [LastModified] datetime2 NULL,
    [LastModifiedBy] nvarchar(max) NULL,
    CONSTRAINT [PK_Occurrences] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Occurrences_Regions_RegionId] FOREIGN KEY ([RegionId]) REFERENCES [Regions] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [Reports] (
    [Id] bigint NOT NULL IDENTITY,
    [OccurrenceDate] date NOT NULL,
    [NumberAffected] bigint NOT NULL,
    [NumberExposed] bigint NOT NULL,
    [DateStarted] date NOT NULL,
    [DateEnded] date NOT NULL,
    [IsOngoing] bit NOT NULL,
    [IsVerified] bit NOT NULL,
    [Mortality] bigint NOT NULL,
    [ReportType] int NOT NULL,
    [Longitude] decimal(18,2) NOT NULL,
    [Latitude] decimal(18,2) NOT NULL,
    [DesctructionOfCorpses] bit NOT NULL,
    [Disinfection] bit NOT NULL,
    [Observation] bit NOT NULL,
    [Quarantine] bit NOT NULL,
    [MovementControl] bit NOT NULL,
    [Treatment] bit NOT NULL,
    [TreatmentDetails] nvarchar(max) NOT NULL,
    [VaccinationId] bigint NOT NULL,
    [DiagnosticTestId] bigint NOT NULL,
    [OccurrenceId] bigint NOT NULL,
    [DiseaseId] bigint NOT NULL,
    [SpeciesId] bigint NOT NULL,
    [RegionId] bigint NOT NULL,
    [Created] datetime2 NOT NULL,
    [CreatedBy] nvarchar(max) NULL,
    [LastModified] datetime2 NULL,
    [LastModifiedBy] nvarchar(max) NULL,
    CONSTRAINT [PK_Reports] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Reports_Occurrences_OccurrenceId] FOREIGN KEY ([OccurrenceId]) REFERENCES [Occurrences] ([Id])
);
GO

CREATE INDEX [IX_DiagnosticTests_InstitutionId] ON [DiagnosticTests] ([InstitutionId]);
GO

CREATE INDEX [IX_DiagnosticTests_ProfessionalId] ON [DiagnosticTests] ([ProfessionalId]);
GO

CREATE INDEX [IX_Occurrences_RegionId] ON [Occurrences] ([RegionId]);
GO

CREATE INDEX [IX_Regions_CountryId] ON [Regions] ([CountryId]);
GO

CREATE INDEX [IX_Reports_OccurrenceId] ON [Reports] ([OccurrenceId]);
GO

CREATE INDEX [IX_Vaccinations_DiseaseId] ON [Vaccinations] ([DiseaseId]);
GO

CREATE INDEX [IX_Vaccinations_InstitutionId] ON [Vaccinations] ([InstitutionId]);
GO

CREATE INDEX [IX_Vaccinations_ProfessionalId] ON [Vaccinations] ([ProfessionalId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230406164542_CreateAppEntities', N'7.0.2');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Reports]') AND [c].[name] = N'DateEnded');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Reports] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [Reports] DROP COLUMN [DateEnded];
GO

DECLARE @var1 sysname;
SELECT @var1 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Reports]') AND [c].[name] = N'DateStarted');
IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [Reports] DROP CONSTRAINT [' + @var1 + '];');
ALTER TABLE [Reports] DROP COLUMN [DateStarted];
GO

DECLARE @var2 sysname;
SELECT @var2 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Reports]') AND [c].[name] = N'DiagnosticTestId');
IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [Reports] DROP CONSTRAINT [' + @var2 + '];');
ALTER TABLE [Reports] DROP COLUMN [DiagnosticTestId];
GO

DECLARE @var3 sysname;
SELECT @var3 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Reports]') AND [c].[name] = N'RegionId');
IF @var3 IS NOT NULL EXEC(N'ALTER TABLE [Reports] DROP CONSTRAINT [' + @var3 + '];');
ALTER TABLE [Reports] DROP COLUMN [RegionId];
GO

DECLARE @var4 sysname;
SELECT @var4 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Reports]') AND [c].[name] = N'VaccinationId');
IF @var4 IS NOT NULL EXEC(N'ALTER TABLE [Reports] DROP CONSTRAINT [' + @var4 + '];');
ALTER TABLE [Reports] DROP COLUMN [VaccinationId];
GO

ALTER TABLE [Vaccinations] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

ALTER TABLE [Vaccinations] ADD [RefId] uniqueidentifier NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
GO

ALTER TABLE [Species] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

ALTER TABLE [Species] ADD [RefId] uniqueidentifier NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
GO

DECLARE @var5 sysname;
SELECT @var5 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Reports]') AND [c].[name] = N'Longitude');
IF @var5 IS NOT NULL EXEC(N'ALTER TABLE [Reports] DROP CONSTRAINT [' + @var5 + '];');
ALTER TABLE [Reports] ALTER COLUMN [Longitude] decimal(18,2) NULL;
GO

DECLARE @var6 sysname;
SELECT @var6 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Reports]') AND [c].[name] = N'Latitude');
IF @var6 IS NOT NULL EXEC(N'ALTER TABLE [Reports] DROP CONSTRAINT [' + @var6 + '];');
ALTER TABLE [Reports] ALTER COLUMN [Latitude] decimal(18,2) NULL;
GO

ALTER TABLE [Reports] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

ALTER TABLE [Reports] ADD [RefId] uniqueidentifier NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
GO

ALTER TABLE [Regions] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

ALTER TABLE [Regions] ADD [RefId] uniqueidentifier NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
GO

ALTER TABLE [ParaProfessionals] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

ALTER TABLE [ParaProfessionals] ADD [RefId] uniqueidentifier NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
GO

ALTER TABLE [Occurrences] ADD [DateEnded] date NULL;
GO

ALTER TABLE [Occurrences] ADD [DateStarted] date NOT NULL DEFAULT '0001-01-01';
GO

ALTER TABLE [Occurrences] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

ALTER TABLE [Occurrences] ADD [RefId] uniqueidentifier NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
GO

ALTER TABLE [Institutions] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

ALTER TABLE [Institutions] ADD [RefId] uniqueidentifier NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
GO

ALTER TABLE [Diseases] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

ALTER TABLE [Diseases] ADD [RefId] uniqueidentifier NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
GO

ALTER TABLE [DiagnosticTests] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

ALTER TABLE [DiagnosticTests] ADD [RefId] uniqueidentifier NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
GO

ALTER TABLE [Countries] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

ALTER TABLE [Countries] ADD [RefId] uniqueidentifier NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';
GO

CREATE INDEX [IX_Vaccinations_ReportId] ON [Vaccinations] ([ReportId]);
GO

CREATE INDEX [IX_DiagnosticTests_ReportId] ON [DiagnosticTests] ([ReportId]);
GO

ALTER TABLE [DiagnosticTests] ADD CONSTRAINT [FK_DiagnosticTests_Reports_ReportId] FOREIGN KEY ([ReportId]) REFERENCES [Reports] ([Id]) ON DELETE CASCADE;
GO

ALTER TABLE [Vaccinations] ADD CONSTRAINT [FK_Vaccinations_Reports_ReportId] FOREIGN KEY ([ReportId]) REFERENCES [Reports] ([Id]) ON DELETE CASCADE;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230419055920_AddDatesToOccurrence', N'7.0.2');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [ParaProfessionals] ADD [Name] nvarchar(max) NOT NULL DEFAULT N'';
GO

DECLARE @var7 sysname;
SELECT @var7 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Reports]') AND [c].[name] = N'Longitude');
IF @var7 IS NOT NULL EXEC(N'ALTER TABLE [Reports] DROP CONSTRAINT [' + @var7 + '];');
ALTER TABLE [Reports] ALTER COLUMN [Longitude] decimal(15,2) NULL;
GO

DECLARE @var8 sysname;
SELECT @var8 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Reports]') AND [c].[name] = N'Latitude');
IF @var8 IS NOT NULL EXEC(N'ALTER TABLE [Reports] DROP CONSTRAINT [' + @var8 + '];');
ALTER TABLE [Reports] ALTER COLUMN [Latitude] decimal(15,2) NULL;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230419082321_AddNameToParaProfessionals', N'7.0.2');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

DECLARE @var9 sysname;
SELECT @var9 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Reports]') AND [c].[name] = N'TreatmentDetails');
IF @var9 IS NOT NULL EXEC(N'ALTER TABLE [Reports] DROP CONSTRAINT [' + @var9 + '];');
ALTER TABLE [Reports] ALTER COLUMN [TreatmentDetails] nvarchar(max) NULL;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230419083609_NullableTreatmentDetails', N'7.0.2');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

EXEC sp_rename N'[Reports].[DesctructionOfCorpses]', N'DestructionOfCorpses', N'COLUMN';
GO

ALTER TABLE [AspNetUsers] ADD [FirstName] nvarchar(max) NOT NULL DEFAULT N'';
GO

ALTER TABLE [AspNetUsers] ADD [LastName] nvarchar(max) NOT NULL DEFAULT N'';
GO

CREATE TABLE [TransboundaryDiseases] (
    [Id] bigint NOT NULL IDENTITY,
    [DiseaseId] bigint NOT NULL,
    [SpeciesId] bigint NOT NULL,
    [IsDeleted] bit NOT NULL,
    [RefId] uniqueidentifier NOT NULL,
    [Created] datetime2 NOT NULL,
    [CreatedBy] nvarchar(max) NULL,
    [LastModified] datetime2 NULL,
    [LastModifiedBy] nvarchar(max) NULL,
    CONSTRAINT [PK_TransboundaryDiseases] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_TransboundaryDiseases_Diseases_DiseaseId] FOREIGN KEY ([DiseaseId]) REFERENCES [Diseases] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_TransboundaryDiseases_Species_SpeciesId] FOREIGN KEY ([SpeciesId]) REFERENCES [Species] ([Id]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_TransboundaryDiseases_DiseaseId] ON [TransboundaryDiseases] ([DiseaseId]);
GO

CREATE INDEX [IX_TransboundaryDiseases_SpeciesId] ON [TransboundaryDiseases] ([SpeciesId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230508150317_AddFullNameToAppUser', N'7.0.2');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

DECLARE @var10 sysname;
SELECT @var10 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Vaccinations]') AND [c].[name] = N'Name');
IF @var10 IS NOT NULL EXEC(N'ALTER TABLE [Vaccinations] DROP CONSTRAINT [' + @var10 + '];');
ALTER TABLE [Vaccinations] DROP COLUMN [Name];
GO

DECLARE @var11 sysname;
SELECT @var11 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DiagnosticTests]') AND [c].[name] = N'TestName');
IF @var11 IS NOT NULL EXEC(N'ALTER TABLE [DiagnosticTests] DROP CONSTRAINT [' + @var11 + '];');
ALTER TABLE [DiagnosticTests] DROP COLUMN [TestName];
GO

ALTER TABLE [Vaccinations] ADD [VaccinationTypeId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
GO

ALTER TABLE [DiagnosticTests] ADD [DiagnosticTestTypeId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
GO

CREATE TABLE [DiagnosticTestTypes] (
    [Id] bigint NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [IsDeleted] bit NOT NULL,
    [RefId] uniqueidentifier NOT NULL,
    [Created] datetime2 NOT NULL,
    [CreatedBy] nvarchar(max) NULL,
    [LastModified] datetime2 NULL,
    [LastModifiedBy] nvarchar(max) NULL,
    CONSTRAINT [PK_DiagnosticTestTypes] PRIMARY KEY ([Id])
);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230516092251_AddsVaccineAndDiagnosticTestTypes', N'7.0.2');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

EXEC sp_rename N'[Reports].[NumberAffected]', N'NumberInfected', N'COLUMN';
GO

CREATE TABLE [VaccinationTypes] (
    [Id] bigint NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [IsDeleted] bit NOT NULL,
    [RefId] uniqueidentifier NOT NULL,
    [Created] datetime2 NOT NULL,
    [CreatedBy] nvarchar(max) NULL,
    [LastModified] datetime2 NULL,
    [LastModifiedBy] nvarchar(max) NULL,
    CONSTRAINT [PK_VaccinationTypes] PRIMARY KEY ([Id])
);
GO

CREATE INDEX [IX_Reports_DiseaseId] ON [Reports] ([DiseaseId]);
GO

ALTER TABLE [Reports] ADD CONSTRAINT [FK_Reports_Diseases_DiseaseId] FOREIGN KEY ([DiseaseId]) REFERENCES [Diseases] ([Id]) ON DELETE NO ACTION;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230517045705_RenameAffectedToInfectedOnReports', N'7.0.2');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [Reports] ADD [StampingOut] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230517051127_AddStampintOutToReport', N'7.0.2');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

DECLARE @var12 sysname;
SELECT @var12 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Reports]') AND [c].[name] = N'NumberInfected');
IF @var12 IS NOT NULL EXEC(N'ALTER TABLE [Reports] DROP CONSTRAINT [' + @var12 + '];');
ALTER TABLE [Reports] ALTER COLUMN [NumberInfected] int NOT NULL;
GO

DECLARE @var13 sysname;
SELECT @var13 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Reports]') AND [c].[name] = N'NumberExposed');
IF @var13 IS NOT NULL EXEC(N'ALTER TABLE [Reports] DROP CONSTRAINT [' + @var13 + '];');
ALTER TABLE [Reports] ALTER COLUMN [NumberExposed] int NOT NULL;
GO

DECLARE @var14 sysname;
SELECT @var14 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Reports]') AND [c].[name] = N'Mortality');
IF @var14 IS NOT NULL EXEC(N'ALTER TABLE [Reports] DROP CONSTRAINT [' + @var14 + '];');
ALTER TABLE [Reports] ALTER COLUMN [Mortality] int NOT NULL;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230517053449_ChangedReportDataTypes', N'7.0.2');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [Vaccinations] DROP CONSTRAINT [FK_Vaccinations_Institutions_InstitutionId];
GO

DROP TABLE [DiagnosticTestTypes];
GO

DROP TABLE [VaccinationTypes];
GO

DROP INDEX [IX_Vaccinations_InstitutionId] ON [Vaccinations];
GO

DECLARE @var15 sysname;
SELECT @var15 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Vaccinations]') AND [c].[name] = N'InstitutionId');
IF @var15 IS NOT NULL EXEC(N'ALTER TABLE [Vaccinations] DROP CONSTRAINT [' + @var15 + '];');
ALTER TABLE [Vaccinations] DROP COLUMN [InstitutionId];
GO

DECLARE @var16 sysname;
SELECT @var16 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Vaccinations]') AND [c].[name] = N'VaccinationTypeId');
IF @var16 IS NOT NULL EXEC(N'ALTER TABLE [Vaccinations] DROP CONSTRAINT [' + @var16 + '];');
ALTER TABLE [Vaccinations] DROP COLUMN [VaccinationTypeId];
GO

DECLARE @var17 sysname;
SELECT @var17 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ParaProfessionals]') AND [c].[name] = N'PublicSector');
IF @var17 IS NOT NULL EXEC(N'ALTER TABLE [ParaProfessionals] DROP CONSTRAINT [' + @var17 + '];');
ALTER TABLE [ParaProfessionals] DROP COLUMN [PublicSector];
GO

DECLARE @var18 sysname;
SELECT @var18 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DiagnosticTests]') AND [c].[name] = N'DiagnosticTestTypeId');
IF @var18 IS NOT NULL EXEC(N'ALTER TABLE [DiagnosticTests] DROP CONSTRAINT [' + @var18 + '];');
ALTER TABLE [DiagnosticTests] DROP COLUMN [DiagnosticTestTypeId];
GO

EXEC sp_rename N'[ParaProfessionals].[Type]', N'Position', N'COLUMN';
GO

ALTER TABLE [Vaccinations] ADD [IsAnimal] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

ALTER TABLE [Vaccinations] ADD [IsHuman] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

ALTER TABLE [Vaccinations] ADD [Name] nvarchar(max) NOT NULL DEFAULT N'';
GO

ALTER TABLE [Reports] ADD [CorpsesDestroyed] int NULL;
GO

ALTER TABLE [Reports] ADD [HumanInfection] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

ALTER TABLE [Reports] ADD [HumansExposed] int NOT NULL DEFAULT 0;
GO

ALTER TABLE [Reports] ADD [HumansInfected] int NOT NULL DEFAULT 0;
GO

ALTER TABLE [Reports] ADD [HumansMortality] int NOT NULL DEFAULT 0;
GO

ALTER TABLE [Reports] ADD [MedicationAdministered] nvarchar(max) NULL;
GO

ALTER TABLE [Reports] ADD [MedicationDosage] nvarchar(max) NULL;
GO

ALTER TABLE [Reports] ADD [MovementControlMeasures] nvarchar(max) NULL;
GO

ALTER TABLE [Reports] ADD [ObservationDuration] int NULL;
GO

ALTER TABLE [Reports] ADD [QuarantineDuration] int NULL;
GO

ALTER TABLE [ParaProfessionals] ADD [Email] nvarchar(max) NOT NULL DEFAULT N'';
GO

ALTER TABLE [ParaProfessionals] ADD [Phone] nvarchar(max) NOT NULL DEFAULT N'';
GO

ALTER TABLE [DiagnosticTests] ADD [Name] nvarchar(max) NOT NULL DEFAULT N'';
GO

CREATE TABLE [Medications] (
    [Id] bigint NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [Dosage] nvarchar(max) NOT NULL,
    [ReportId] bigint NOT NULL,
    [IsDeleted] bit NOT NULL,
    [RefId] uniqueidentifier NOT NULL,
    [Created] datetime2 NOT NULL,
    [CreatedBy] nvarchar(max) NULL,
    [LastModified] datetime2 NULL,
    [LastModifiedBy] nvarchar(max) NULL,
    CONSTRAINT [PK_Medications] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Medications_Reports_ReportId] FOREIGN KEY ([ReportId]) REFERENCES [Reports] ([Id]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_Medications_ReportId] ON [Medications] ([ReportId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230520115807_AddsReportFieldsAndMedications', N'7.0.2');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [DiagnosticTests] DROP CONSTRAINT [FK_DiagnosticTests_Institutions_InstitutionId];
GO

ALTER TABLE [Vaccinations] DROP CONSTRAINT [FK_Vaccinations_Diseases_DiseaseId];
GO

DROP INDEX [IX_Vaccinations_DiseaseId] ON [Vaccinations];
GO

DROP INDEX [IX_DiagnosticTests_InstitutionId] ON [DiagnosticTests];
GO

DECLARE @var19 sysname;
SELECT @var19 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Vaccinations]') AND [c].[name] = N'DiseaseId');
IF @var19 IS NOT NULL EXEC(N'ALTER TABLE [Vaccinations] DROP CONSTRAINT [' + @var19 + '];');
ALTER TABLE [Vaccinations] DROP COLUMN [DiseaseId];
GO

DECLARE @var20 sysname;
SELECT @var20 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Reports]') AND [c].[name] = N'MedicationAdministered');
IF @var20 IS NOT NULL EXEC(N'ALTER TABLE [Reports] DROP CONSTRAINT [' + @var20 + '];');
ALTER TABLE [Reports] DROP COLUMN [MedicationAdministered];
GO

DECLARE @var21 sysname;
SELECT @var21 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Reports]') AND [c].[name] = N'MedicationDosage');
IF @var21 IS NOT NULL EXEC(N'ALTER TABLE [Reports] DROP CONSTRAINT [' + @var21 + '];');
ALTER TABLE [Reports] DROP COLUMN [MedicationDosage];
GO

DECLARE @var22 sysname;
SELECT @var22 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DiagnosticTests]') AND [c].[name] = N'InstitutionId');
IF @var22 IS NOT NULL EXEC(N'ALTER TABLE [DiagnosticTests] DROP CONSTRAINT [' + @var22 + '];');
ALTER TABLE [DiagnosticTests] DROP COLUMN [InstitutionId];
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230523073840_AddPropsToReports', N'7.0.2');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

DECLARE @var23 sysname;
SELECT @var23 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Reports]') AND [c].[name] = N'HumansMortality');
IF @var23 IS NOT NULL EXEC(N'ALTER TABLE [Reports] DROP CONSTRAINT [' + @var23 + '];');
ALTER TABLE [Reports] ALTER COLUMN [HumansMortality] int NULL;
GO

DECLARE @var24 sysname;
SELECT @var24 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Reports]') AND [c].[name] = N'HumansInfected');
IF @var24 IS NOT NULL EXEC(N'ALTER TABLE [Reports] DROP CONSTRAINT [' + @var24 + '];');
ALTER TABLE [Reports] ALTER COLUMN [HumansInfected] int NULL;
GO

DECLARE @var25 sysname;
SELECT @var25 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Reports]') AND [c].[name] = N'HumansExposed');
IF @var25 IS NOT NULL EXEC(N'ALTER TABLE [Reports] DROP CONSTRAINT [' + @var25 + '];');
ALTER TABLE [Reports] ALTER COLUMN [HumansExposed] int NULL;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230523120245_MakeHumanInfectionsNullable', N'7.0.2');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

DECLARE @var26 sysname;
SELECT @var26 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Reports]') AND [c].[name] = N'QuarantineDuration');
IF @var26 IS NOT NULL EXEC(N'ALTER TABLE [Reports] DROP CONSTRAINT [' + @var26 + '];');
ALTER TABLE [Reports] ALTER COLUMN [QuarantineDuration] nvarchar(max) NULL;
GO

DECLARE @var27 sysname;
SELECT @var27 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Reports]') AND [c].[name] = N'ObservationDuration');
IF @var27 IS NOT NULL EXEC(N'ALTER TABLE [Reports] DROP CONSTRAINT [' + @var27 + '];');
ALTER TABLE [Reports] ALTER COLUMN [ObservationDuration] nvarchar(max) NULL;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230523125044_ChangeReportsPropTypes', N'7.0.2');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [ParaProfessionals] ADD [InstitutionId] bigint NULL;
GO

CREATE INDEX [IX_ParaProfessionals_InstitutionId] ON [ParaProfessionals] ([InstitutionId]);
GO

ALTER TABLE [ParaProfessionals] ADD CONSTRAINT [FK_ParaProfessionals_Institutions_InstitutionId] FOREIGN KEY ([InstitutionId]) REFERENCES [Institutions] ([Id]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230524132330_AddInstitutionToPros', N'7.0.2');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Municipalities] (
    [Id] bigint NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [RegionId] bigint NOT NULL,
    [IsDeleted] bit NOT NULL,
    [RefId] uniqueidentifier NOT NULL,
    [Created] datetime2 NOT NULL,
    [CreatedBy] nvarchar(max) NULL,
    [LastModified] datetime2 NULL,
    [LastModifiedBy] nvarchar(max) NULL,
    CONSTRAINT [PK_Municipalities] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Municipalities_Regions_RegionId] FOREIGN KEY ([RegionId]) REFERENCES [Regions] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [Districts] (
    [Id] bigint NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [MunicipalityId] bigint NOT NULL,
    [IsDeleted] bit NOT NULL,
    [RefId] uniqueidentifier NOT NULL,
    [Created] datetime2 NOT NULL,
    [CreatedBy] nvarchar(max) NULL,
    [LastModified] datetime2 NULL,
    [LastModifiedBy] nvarchar(max) NULL,
    CONSTRAINT [PK_Districts] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Districts_Municipalities_MunicipalityId] FOREIGN KEY ([MunicipalityId]) REFERENCES [Municipalities] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [Communities] (
    [Id] bigint NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [DistrictId] bigint NOT NULL,
    [IsDeleted] bit NOT NULL,
    [RefId] uniqueidentifier NOT NULL,
    [Created] datetime2 NOT NULL,
    [CreatedBy] nvarchar(max) NULL,
    [LastModified] datetime2 NULL,
    [LastModifiedBy] nvarchar(max) NULL,
    CONSTRAINT [PK_Locations] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Communities_Districts_DistrictId] FOREIGN KEY ([DistrictId]) REFERENCES [Districts] ([Id]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_Districts_MunicipalityId] ON [Districts] ([MunicipalityId]);
GO

CREATE INDEX [IX_Communities_DistrictId] ON [Communities] ([DistrictId]);
GO

CREATE INDEX [IX_Municipalities_RegionId] ON [Municipalities] ([RegionId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230619073017_ExpandsRegionEntity', N'7.0.2');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [Occurrences] ADD [CommunityId] bigint NULL;
GO

ALTER TABLE [Occurrences] ADD [DistrictId] bigint NULL;
GO

ALTER TABLE [Occurrences] ADD [MunicipalityId] bigint NULL;
GO

CREATE INDEX [IX_Occurrences_CommunityId] ON [Occurrences] ([CommunityId]);
GO

CREATE INDEX [IX_Occurrences_DistrictId] ON [Occurrences] ([DistrictId]);
GO

CREATE INDEX [IX_Occurrences_MunicipalityId] ON [Occurrences] ([MunicipalityId]);
GO

ALTER TABLE [Occurrences] ADD CONSTRAINT [FK_Occurrences_Communities_CommunityId] FOREIGN KEY ([CommunityId]) REFERENCES [Communities] ([Id]);
GO

ALTER TABLE [Occurrences] ADD CONSTRAINT [FK_Occurrences_Districts_DistrictId] FOREIGN KEY ([DistrictId]) REFERENCES [Districts] ([Id]);
GO

ALTER TABLE [Occurrences] ADD CONSTRAINT [FK_Occurrences_Municipalities_MunicipalityId] FOREIGN KEY ([MunicipalityId]) REFERENCES [Municipalities] ([Id]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230621213016_ExpandsOccurrenceLocationInfo', N'7.0.2');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [Reports] ADD [NotifiabilityPoints] int NOT NULL DEFAULT 0;
GO

ALTER TABLE [Occurrences] ADD [TransboundaryDiseaseId] bigint NULL;
GO

ALTER TABLE [Diseases] ADD [IsMonitored] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

ALTER TABLE [Diseases] ADD [IsNotifiable] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

CREATE INDEX [IX_Occurrences_TransboundaryDiseaseId] ON [Occurrences] ([TransboundaryDiseaseId]);
GO

ALTER TABLE [Occurrences] ADD CONSTRAINT [FK_Occurrences_TransboundaryDiseases_TransboundaryDiseaseId] FOREIGN KEY ([TransboundaryDiseaseId]) REFERENCES [TransboundaryDiseases] ([Id]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230627085210_AddTransDiseasesToOccurrence', N'7.0.2');
GO

COMMIT;
GO

